#![allow(unused_assignments)]
#![allow(unused_variables)]

use crate::utils::{self, project::ProjectPath};

use super::{NextRoute, NextRouterEntry, RouteParam, RoutePurpose};

pub fn parse_dir(project_path: ProjectPath, routes: &mut Vec<NextRoute>) -> anyhow::Result<()> {
    let dir = utils::fs::read_dir(&project_path.absolute)?;

    // Meta data files
    let mut loading = false;
    let mut error = false;
    let mut layout = false;
    let mut template = false;
    let mut not_found = false;

    // Routing file info
    let mut route_file_ext: Option<&str> = None;
    let mut route_purpose: Option<RoutePurpose> = None;

    // Parse current directory
    for (meta, path, entry) in dir.iter().filter(|&(meta, _, __)| meta.is_file()) {
        #[rustfmt::skip]
        match path.file_name().unwrap().to_str().unwrap().split('.').next().unwrap() {
            "layout" => { layout = true; }
            "error" => { error = true; }
            "template" => { template = true; }
            "loading" => { loading = true; }
            "not-found" => { not_found = true; }
            "page" => { 
                route_file_ext = Some(path.extension().unwrap().to_str().unwrap());
                route_purpose = Some(RoutePurpose::Page);
            }
            "route" => { 
                route_file_ext = Some(path.extension().unwrap().to_str().unwrap());
                route_purpose = Some(RoutePurpose::API);
            }
            _ => {}
        };
    }

    if let Some(route_purpose) = route_purpose {
        let mut route_path = project_path.join(
            match route_purpose {
                RoutePurpose::Page => "page",
                RoutePurpose::API => "route",
            }
            .to_owned()
                + "."
                + route_file_ext.unwrap(),
        );

        let relative_path = route_path.relative();

        let up_rel_path = {
            let mut segments: Vec<_> = relative_path.split('/').collect();

            segments.remove(segments.len() - 2); // Removes the last directory
            segments.join("/")
        };

        let url_path = project_path.url();

        routes.push(NextRoute {
            params: RouteParam::from_route_path(&url_path),
            parent_index: routes
                .iter()
                .enumerate()
                .filter(|(_, x)| url_path.starts_with(&x.url_path))
                .fold(None, |current_parent, (i, x)| {
                    if x.url_path.len()
                        > current_parent.map_or(0, |parent_idx| routes[parent_idx].url_path.len())
                    {
                        Some(i)
                    } else {
                        current_parent
                    }
                }),
            url_path,
            relative_path,
            absolute_path: route_path.absolute,
            router: NextRouterEntry::App {
                loading,
                error,
                layout,
                template,
                not_found,
            },
            purpose: route_purpose,
        });
    }

    // Parse subdirectories
    for (_, path, __) in dir.iter().filter(|&(meta, _, __)| meta.is_dir()) {
        parse_dir(project_path.new_with_subpath(path.to_owned()), routes)?;
    }


    return anyhow::Ok(());
}

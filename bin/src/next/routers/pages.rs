use crate::utils::{self, project::ProjectPath};

use super::{NextRoute, NextRouterEntry, RouteParam, RoutePurpose};

pub fn parse_dir(project_path: ProjectPath, routes: &mut Vec<NextRoute>) -> anyhow::Result<()> {
    let dir = utils::fs::read_dir(&project_path.absolute)?;

    // Parse current directory
    for (_meta, path, _entry) in dir.iter().filter(|&(meta, _, __)| meta.is_file()) {
        let extension = path.extension().unwrap().to_str().unwrap();

        let purpose = match extension {
            "tsx" | "jsx" => RoutePurpose::Page,
            "ts" | "js" => RoutePurpose::Page,
            _ => continue,
        };

        let route_path = project_path.new_with_subpath(
            if path.file_stem().unwrap().to_str().unwrap() == "index" {
                project_path.absolute.to_owned()
            } else {
                path.to_owned()
            },
        );
        let url_path = route_path.url();

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
            relative_path: route_path.relative(),
            absolute_path: route_path.absolute,
            router: NextRouterEntry::Pages,
            purpose,
        });
    }

    // Parse subdirectories
    for (_, path, __) in dir.iter().filter(|&(meta, _, __)| meta.is_dir()) {
        parse_dir(project_path.new_with_subpath(path.to_owned()), routes)?;
    }

    return anyhow::Ok(());
}

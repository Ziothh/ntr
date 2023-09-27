mod build;
mod utils;

use std::{
    fmt::format,
    fs,
    path::{Path, PathBuf},
};

const PROJECT_ROUTE: &str = "~/diginaut/neapharma/fuel-plan/app";

fn main() -> anyhow::Result<()> {
    let mut path = utils::fs::parse_path(PROJECT_ROUTE.to_owned());
    println!("Project at \"{}\"\n", path.to_str().unwrap_or(""));

    if !path.ends_with("/src") {
        path.push("src");
        path = path.canonicalize().expect("Project needs an src directory");
    }

    let pages: Vec<_> = path
        .read_dir()?
        .flatten()
        .map(|entry| {
            let file_name = entry.file_name();
            let Some(file_name) = file_name.to_str() else {
                return None;
            };

            let router = match file_name {
                "app" => nra::routing::NextRouter::App,
                "pages" => nra::routing::NextRouter::Pages,
                _ => {
                    return None;
                }
            };

            let root = path.join(file_name);

            return Some(read_routing_dir(
                root.to_owned().to_str().unwrap(),
                root,
                router,
            ));
        })
        .flatten()
        .flatten()
        .collect();

    pages.iter().for_each(|p| {
        println!("{:#?}: {}", p.router, p.url_path);
    });

    generate_route_types(&pages);

    return Ok(());
}

fn read_routing_dir(
    root_path: &str,
    path: PathBuf,
    router: nra::routing::NextRouter,
) -> Vec<nra::routing::File> {
    let mut files = vec![];

    for (metadata, path, _entry) in utils::read_dir(path).expect("Dir to read succesfully") {
        if metadata.is_dir() {
            // Recursively call this function
            files.append(&mut read_routing_dir(root_path, path, router));
            continue;
        }

        let Some(ext) = path.extension().and_then(|ext| ext.to_str()) else {
            continue;
        };
        let Ok(purpose) = nra::routing::FilePurpose::try_from_file_ext(ext) else {
            continue;
        };

        if router == nra::routing::NextRouter::App
            && path.file_stem().unwrap().to_str().unwrap() != "page"
        {
            continue;
        }

        let path_offset = {
            let Some(path_as_str) = path.to_str() else {
                continue;
            };

            // Equal to `".{ext}"`
            let ext_length_with_dot = ext.len() + 1;

            path_as_str.len()
                - match router {
                    nra::routing::NextRouter::Pages => ext_length_with_dot,
                    nra::routing::NextRouter::App => 5 /* = "/page".len() */ + ext_length_with_dot,
                }
        };

        let mut url_path =
            path.to_str().unwrap().to_owned()[root_path.len()..path_offset].to_owned();

        if router == nra::routing::NextRouter::App && url_path.find('(').is_some() {
            url_path = url_path
                .split('/')
                .filter(|segment| !segment.starts_with('(') && !segment.ends_with(')'))
                .collect::<Vec<_>>()
                .join("/");
        }

        files.push(nra::routing::File {
            abs_path: path,
            url_path,
            purpose,
            router,
        })
    }

    return files;
}

fn generate_route_types(routes: &Vec<nra::routing::File>) {
    let playground_path = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../playground")
        .canonicalize()
        .expect("target project at PROJECT_ROOT/playground to exist");

    let app_router_files: Vec<_> = routes
        .iter()
        .filter(|f| f.router == nra::routing::NextRouter::App)
        .collect();
    let pages_router_files: Vec<_> = routes
        .iter()
        .filter(|f| f.router == nra::routing::NextRouter::Pages)
        .collect();

    let format_files = |files: Vec<&nra::routing::File>| {
        files
            .iter()
            .map(|f| format!("\n    | \"{}\"", f.url_path))
            .collect::<String>()
    };

    let contents = vec![
        "export namespace Routes {",
        &format!(
            "  export type Pages = {}",
            format_files(pages_router_files)
        ),
        &format!("  export type App = {}", format_files(app_router_files)),
        "  export type All = Pages | App",
        "}",
    ]
    .join("\n\n");

    let target_dir = playground_path.join("generated");
    fs::create_dir_all(&target_dir).expect("Generated dir to be created");

    fs::write(target_dir.join("routes.ts"), contents).expect("The route types to be generated");
}

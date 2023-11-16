use std::path::Path;

use clap::Parser;

use crate::{cli::CLI, utils::project::ProjectPath};

mod cli;
mod next;
mod utils;

/// The name in `package.json` in `../lib`.
const NODE_LIBRARY_NAME: &str = "@next-typed-routes/lib";

fn bin() -> Result<(), String> {
    let cli = CLI::parse();

    let Ok(project_path) = Path::new(&cli.project_path).canonicalize() else {
        return Err(format!(
            "Project path \"{}\" does not exist.",
            cli.project_path
        ));
    };
    println!("Parsing project at \"{}\"\n", project_path.to_str().unwrap());

    if project_path.join("package.json").canonicalize().is_err() {
        return Err("The project directory does not contain a package.json file.".to_owned());
    }

    let src = next::project::find_project_source(&project_path.to_owned()).unwrap();

    let out_dir = project_path.join("generated");
    std::fs::create_dir_all(&out_dir).unwrap();

    // Handle pages dir
    let pages_dir_str = match src.join("pages").canonicalize() {
        Ok(pages_dir) => {
            let mut entries = Vec::new();
            next::routers::pages::parse_dir(ProjectPath::from_root(pages_dir), &mut entries)
                .unwrap();

            serde_json::to_string_pretty(&entries).unwrap()
        }
        Err(_) => "[]".to_owned(),
    };

    // Handle app dir
    let app_dir_str = match src.join("app").canonicalize() {
        Ok(app_dir) => {
            let mut entries = Vec::new();
            next::routers::app::parse_dir(ProjectPath::from_root(app_dir), &mut entries).unwrap();

            serde_json::to_string_pretty(&entries).unwrap()
        }
        Err(_) => "[]".to_owned(),
    };

    write_node_modules_types(&project_path, &pages_dir_str, &app_dir_str).unwrap();
    write_ts(&out_dir, &pages_dir_str, &app_dir_str).unwrap();

    return Ok(());
}

/// Write the parsed routes to a TypeScript file.
fn write_node_modules_types(
    project_path: &Path,
    pages_dir_str: &str,
    app_dir_str: &str,
) -> anyhow::Result<()> {
    std::fs::write(
        project_path.join(format!(
            "node_modules/{}/npm/generated/routes.d.ts",
            NODE_LIBRARY_NAME
        )),
        [
            "/* NOTE: THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT. */\n",
            &format!("\nexport type PAGES_ROUTES = {};", pages_dir_str),
            &format!("\nexport type APP_ROUTES = {};", app_dir_str),
        ]
        .join("\n"),
    )
    .unwrap();

    println!("> Wrote types to {NODE_LIBRARY_NAME}");

    return anyhow::Ok(());
}

/// Write the parsed routes to a TypeScript file.
fn write_ts(out_dir: &Path, pages_dir_str: &str, app_dir_str: &str) -> anyhow::Result<()> {
    let mut contents =
        "/* NOTE: THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT. */\n\n".to_owned();
    contents += &format!("\nexport const PAGES_ROUTES = {} as const;", pages_dir_str);
    contents += &format!("\nexport const APP_ROUTES = {} as const;", app_dir_str,);

    let out_file = out_dir.join("routes.ts");
    std::fs::write(&out_file, contents).unwrap();

    println!("> Wrote ts generated output to {out_file:?}");

    return anyhow::Ok(());
}

fn main() {
    match bin() {
        Ok(_) => (),
        Err(err) => {
            eprint!("Error:\n{}", err);
            std::process::exit(1);
        }
    }
}

use std::fs::File;

use crate::utils::project::ProjectPath;

mod next;
mod utils;

const PROJECT_ROUTE: &str = "~/projects/libs/nra/playground";
const OUT_DIR: &str = "~/projects/libs/nra/playground/generated";

fn main() -> anyhow::Result<()> {
    let root = utils::fs::parse_path(PROJECT_ROUTE.to_owned())?
        .canonicalize()
        .expect("Directory to exist");
    let src = next::project::find_project_source(&root.to_owned())?;

    let out_dir = utils::fs::parse_path(OUT_DIR.to_owned())?;
    std::fs::create_dir_all(&out_dir)?;

    println!("Project at \"{}\"\n", root.to_str().unwrap_or(""));

    let mut contents =
        "/* NOTE: THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT. */\n\n".to_owned();

    // Handle pages dir
    contents += &format!(
        "\nexport const PAGES_ROUTES = {} as const;",
        match src.join("pages").canonicalize() {
            Ok(pages_dir) => {
                let mut entries = Vec::new();
                next::routers::pages::parse_dir(ProjectPath::from_root(pages_dir), &mut entries)?;

                serde_json::to_string_pretty(&entries)?
            }
            Err(_) => "[]".to_owned(),
        }
    );

    // Handle app dir
    contents += &format!(
        "\nexport const APP_ROUTES = {} as const;",
        match src.join("app").canonicalize() {
            Ok(app_dir) => {
                let mut entries = Vec::new();
                next::routers::app::parse_dir(ProjectPath::from_root(app_dir), &mut entries)?;

                serde_json::to_string_pretty(&entries)?
            }
            Err(_) => "[]".to_owned(),
        }
    );

    std::fs::write(out_dir.join("routes.ts"), contents)?;

    println!("Wrote generated output to {out_dir:?}");

    return Ok(());
}

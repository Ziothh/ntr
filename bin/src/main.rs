use std::path::Path;

use crate::utils::project::ProjectPath;

mod next;
mod utils;

const PROJECT_ROUTE: &str = "~/projects/libs/nra/playground";
const OUT_DIR: &str = "~/projects/libs/nra/playground/generated";

fn main() -> anyhow::Result<()> {
    let mut root = utils::fs::parse_path(PROJECT_ROUTE.to_owned())?.canonicalize().expect("Directory to exist");
    let src = next::project::find_project_source(&root.to_owned())?;


    let out_dir = utils::fs::parse_path(OUT_DIR.to_owned())?;
    std::fs::create_dir_all(&out_dir)?;
        
    println!("Project at \"{}\"\n", root.to_str().unwrap_or(""));



    if let Ok(pages_dir) = src.join("pages").canonicalize() {
        // Handle pages dir
        let mut entries = Vec::new();
        next::routers::pages::parse_dir(ProjectPath::from_root(pages_dir), &mut entries)?;

        std::fs::write(
            out_dir.join("pagesRoutes.json"),
            serde_json::to_string_pretty(&entries)?,
        )?;
    }

    if let Ok(app_dir) = src.join("app").canonicalize() {
        // Handle app dir
        let mut entries = Vec::new();
        next::routers::app::parse_dir(ProjectPath::from_root(app_dir), &mut entries)?;

        std::fs::write(
            out_dir.join("appRoutes.json"),
            serde_json::to_string_pretty(&entries)?,
        )?;
    }

    println!("Wrote generated output to {out_dir:?}");

    return Ok(());
}

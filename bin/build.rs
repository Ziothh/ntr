use std::{fs::File, io::Write, path::Path};

use routers::{NextRoute, NextRouterEntry, RouteParam, RoutePurpose};

#[path = "./src/next/routers/mod.rs"]
mod routers;
#[path = "./src/utils/mod.rs"]
mod utils;

pub fn main() -> anyhow::Result<()> {
    #[rustfmt::skip]
    let config = specta::ts::ExportConfiguration::new()
        .bigint(specta::ts::BigIntExportBehavior::Number);

    #[rustfmt::skip]
    let mut file = File::create(
        Path::new(&std::env::var("OUT_DIR").unwrap())
            .join("../../../../../lib/generated/types.ts"),
    )?;

    let contents = [
        "/* THIS FILE HAS BEEN AUTOMATICALLY GENERATED AND CONTAINS TYPES THAT CORESPOND WITH THE RUST BINARY */\n".to_owned(),
        specta::ts::export::<RouteParam>(&config)?,
        specta::ts::export::<RoutePurpose>(&config)?,
        specta::ts::export::<NextRoute>(&config)?,
        specta::ts::export::<NextRouterEntry>(&config)?,
    ].join("\n\n");

    file.write(contents.as_bytes())?;

    // "/home/zioth/projects/libs/nra/target/debug/build/bin-be77804982abcca0/out/"

    return anyhow::Ok(());
}

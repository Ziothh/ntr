use std::{fs, path::PathBuf};

use anyhow::{anyhow, Result};

const HOME_TOKEN: &str = "~";

/// Replaces the `"~"` with the path to the users home directory
pub fn parse_path(mut path: String) -> Result<PathBuf> {
    if path.starts_with(HOME_TOKEN) {
        path = path.replace(
            HOME_TOKEN,
            dirs::home_dir()
                .ok_or(anyhow!("$HOME environment variable is not set"))?
                .to_str()
                .ok_or(anyhow!("$HOME environment variable is not valid UTF-8"))?,
        );
    }

    return Ok(PathBuf::from(path));
}

/// Reads a directory via a given `path` and returns useful helpers.
/// Also filters out all ignored folders & files that start with `"_"`.
pub fn read_dir(path: &PathBuf) -> anyhow::Result<Vec<(fs::Metadata, PathBuf, fs::DirEntry)>> {
    return anyhow::Ok(
        path.read_dir()?
            .flatten()
            .map(|entry| (fs::metadata(entry.path()).unwrap(), entry.path(), entry))
            .filter(|(_, path, __)| {
                path.file_name()
                    .expect("Path to have a file name")
                    .to_str()
                    .is_some_and(|name| !name.starts_with("_"))
            })
            .collect(),
    );
}

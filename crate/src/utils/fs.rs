use std::{fs, path::PathBuf};

const HOME_TOKEN: &str = "~";

/// Replaces the `"~"` with the path to the users home directory
/// Also ensures the path exists
pub fn parse_path(mut path: String) -> PathBuf {
    if path.starts_with(HOME_TOKEN) {
        path = path.replace(
            HOME_TOKEN,
            dirs::home_dir()
                .expect("\"HOME\" env variable to be set")
                .to_str()
                .expect("\"HOME\" env variable path can not be None"),
        );
    }

    return PathBuf::from(path).canonicalize().expect("Path to exist");
}

/// Reads a directory via a given `path` and returns useful helpers.
/// Also filters out all ignored folders & files that start
/// with `"_"`
pub fn read_dir(path: PathBuf) -> anyhow::Result<Vec<(fs::Metadata, PathBuf, fs::DirEntry)>> {
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

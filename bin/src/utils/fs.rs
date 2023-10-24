use std::{fs, path::PathBuf};

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

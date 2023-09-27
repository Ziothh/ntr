use std::{
    io,
    path::PathBuf,
};

pub fn find_project_source(path: &PathBuf) -> io::Result<PathBuf> {
    let path = path.canonicalize()?;

    if path.ends_with("/src") {
        return Ok(path);
    }

    return Ok(path.join("src").canonicalize().unwrap_or(path));
}

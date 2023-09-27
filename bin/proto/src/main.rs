use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::{
    ts::{export, ExportConfiguration},
    Type,
};

#[derive(Debug)]
pub struct ProjectPath {
    /// Project root
    pub root: PathBuf,
    /// Absolute path to a point in the project
    pub absolute: PathBuf,
}

impl ProjectPath {
    /// Relative path string that starts from the root
    pub fn relative(&self) -> String {
        let str = self.absolute.to_str().unwrap();

        return str[0..(str.len()
            - match self.absolute.extension() {
                Some(ext) => 1 + ext.len(),
                None => 0,
            })]
            .replace(self.root.to_str().unwrap(), ".");
    }

    pub fn url(&self) -> String {
        let str = self.absolute.to_str().unwrap();

        println!("{:#?}", self.absolute.is_file());

        #[rustfmt::skip]
        return str[
            self.root.to_str().unwrap().len()
            ..
            (str.len() - if self.absolute.is_dir() { 0 } else { 
                match self.absolute.extension() {
                    Some(ext) => 1 + ext.len(),
                    None => 0,
                }
            })
        ]
        .split('/')
        .filter(|segment| !segment.starts_with('('))
        .collect::<Vec<_>>()
        .join("/");
    }

    pub fn from_root(root: PathBuf) -> Self {
        Self {
            absolute: root.clone(),
            root,
        }
    }

    /// Panics if path does not start with `self.root`
    pub fn new_with_subpath(&self, absolute_path: PathBuf) -> Self {
        if !absolute_path.starts_with(&self.root) {
            panic!(
                "Given path {:?} does not start with `self.root`",
                absolute_path
            );
        }

        return Self {
            root: self.root.clone(),
            absolute: absolute_path,
        };
    }

    pub fn join<P: AsRef<std::path::Path>>(&self, path: P) -> Self {
        return self.new_with_subpath(self.absolute.join(path));
    }
}

fn main() {
    // println!(
    //     "{:?}",
    //     PathBuf::from("~/diginaut/neapharma/fuel-plan/app")
    //         .canonicalize()
    //         .unwrap()
    //         .exists()
    // );

    // std::fs::write(
    //     "/home/zioth/projects/libs/nra/bin/test.ts",
    //     export::<RouteParam>(&ExportConfiguration::new()).unwrap(),
    // );
    //

    // println!(
    //     "{}",
    //     Path::new("/home/zioth/temp/").to_path_buf() > Path::new("/home/zioth").to_path_buf()
    // );
    //

    let path = "/home/zioth/projects/libs/nra/playground/src/app/products/[[...catchAll]]";
    println!(
        "{:#?}",
        ProjectPath {
            root: Path::new("/home/zioth/projects/libs/nra/playground").to_path_buf(),
            absolute: Path::new(&path).to_path_buf(),
        }
        .url()
    )
}

use std::path::PathBuf;

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

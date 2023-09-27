use std::path::PathBuf;

#[derive(Debug)]
pub struct File {
    pub abs_path: PathBuf,
    pub url_path: String,
    pub router: NextRouter,
    pub purpose: FilePurpose,
}

#[derive(PartialEq, Debug, Clone, Copy, specta::Type)]
pub enum NextRouter {
    Pages,
    App,
}

#[derive(PartialEq, Debug, Clone, Copy, specta::Type)]
pub enum FilePurpose {
    Page,
    API,
}

impl FilePurpose {
    pub fn try_from_file_ext(extension: &str) -> Result<Self, String> {
        return match extension {
            "tsx" => Ok(FilePurpose::Page),
            "jsx" => Ok(FilePurpose::Page),
            "ts" => Ok(FilePurpose::API),
            "js" => Ok(FilePurpose::API),
            _ => Err(format!(
                "Extension \"{extension}\" is not supported"
            )),
        };
    }
}

use std::path::PathBuf;

use serde::{Deserialize, Serialize};
use specta::Type;

pub mod app;
pub mod pages;

#[derive(Serialize, Deserialize, Type, Debug)]
pub enum RoutePurpose {
    API,
    #[serde(rename = "page")]
    Page,
}

#[derive(Serialize, Deserialize, Type, Debug)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum NextRouterEntry {
    Pages,
    #[serde(rename_all = "camelCase")]
    App {
        /// loading.js
        loading: bool,
        /// error.js
        error: bool,
        /// layout.js
        layout: bool,
        /// template.js
        template: bool,
        /// not-found.js
        not_found: bool,
    },
}

#[derive(Serialize, Deserialize, Type, Debug)]
#[serde(tag = "type", content = "key", rename_all = "camelCase")]
pub enum RouteParam {
    Single(String),
    CatchAll(String),
}

impl RouteParam {
    /// Parses a route segment into a `RouteParam`.
    ///
    /// # Panics
    /// If the segment contains a "/"
    ///
    ///
    pub fn from_segment(segment: &str) -> Option<RouteParam> {
        if segment.find('/').is_some() {
            panic!(r#"Segment should not contain a "/""#);
        }

        if segment.starts_with("[[") && segment.ends_with("]]") {
            return Some(RouteParam::CatchAll(
                segment[5..(segment.len() - 2)].to_owned(),
                // Takes the value in [[...${value}]]
            ));
        }
        if segment.starts_with("[") && segment.ends_with("]") {
            return Some(RouteParam::Single(
                segment[1..(segment.len() - 1)].to_owned(),
            ));
        }

        return None;
    }
    pub fn from_route_path(path: &str) -> Option<Vec<RouteParam>> {
        let params = path
            .split('/')
            .map(RouteParam::from_segment)
            .flatten()
            .collect::<Vec<_>>();

        return if params.len() == 0 {
            None
        } else {
            Some(params)
        };
    }
}

#[derive(Serialize, Deserialize, Type, Debug)]
#[serde(rename_all = "camelCase")]
pub struct NextRoute {
    /// The url path to the page / API endpoint
    pub url_path: String,
    pub absolute_path: PathBuf,
    pub relative_path: String,

    pub router: NextRouterEntry,
    /// An optional vec of route parameters
    pub params: Option<Vec<RouteParam>>,

    /// Wether its a page or API route.
    pub purpose: RoutePurpose,

    pub parent_index: Option<usize>,
    // pub child_index: Option<usize>,
}

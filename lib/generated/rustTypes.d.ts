/* THIS FILE HAS BEEN AUTOMATICALLY GENERATED AND CONTAINS TYPES THAT CORESPOND WITH THE RUST BINARY */


export type RouteParam = { type: "single"; name: string } | { type: "catchAll"; name: string; optional: boolean }

export type RoutePurpose = "API" | "page"

export type NextRoute = { urlPath: string; absolutePath: string; relativePath: string; router: NextRouterEntry; params: RouteParam[] | null; purpose: RoutePurpose; parentIndex: number | null }

export type NextRouterEntry = { type: "pages" } | { type: "app"; loading: boolean; error: boolean; layout: boolean; template: boolean; notFound: boolean }
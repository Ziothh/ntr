import type { PAGES_ROUTES, APP_ROUTES } from '../generated/routes';
import type { NextRoute, RouteParam } from './rustTypes';

/** Namespace containing generated Next.js routes */
export namespace Routes {
  /** `/app` dir routes */
  export type AppDir = APP_ROUTES[number];
  /** `/pages` dir routes */
  export type PagesDir = PAGES_ROUTES[number];

  /** `/app` & `/pages` dir routes combined */
  export type All = AppDir | PagesDir;

  export namespace Paths {
    export type AppDir = Routes.AppDir['urlPath'] & {};
    export type PagesDir = Routes.PagesDir['urlPath'];
    export type All = Routes.Paths.AppDir | Routes.Paths.PagesDir;

    export type getParams<T extends Routes.Paths.All> = {
      [P in T]: Routes.Params.get<Routes.getByPath<Routes.All, P>>
      // [P in T]: Routes.getByPath<Routes.All, P>
    }[T]
  }

  export type getByPath<R extends NextRoute, Path extends R['urlPath']> = Extract<R, { urlPath: Path }>;
  /** Get the params for a given route.
      * NOTE: not to be used in enums */

  export namespace Params {
    type parseRouteParamUnion<Union extends RouteParam> =
      // Single params are of type string
      & Record<Extract<Union, { type: 'single' }>['name'], string>
      // Catch-all params are of type [string, ...string[]]
      & Record<Extract<Union, { type: 'catchAll', optional: false }>['name'], [string, ...string[]]>
      // Optional Catch-all params are of type string[] | undefined
      & Partial<Record<Extract<Union, { type: 'catchAll', optional: true }>['name'], string[]>>

    export type get<R extends NextRoute> = R['params'] extends null
      ? never
      : parseRouteParamUnion<Exclude<R['params'], null>[number]>

    // namespace __ {
    //   type R = (APP_ROUTES | PAGES_ROUTES)[number]
    //   type P = Exclude<R['params'], { params: null }>
    //   type U = Exclude<P, null>[number]
    //   type A = parseRouteParamUnion<U>
    //
    //   type MyRoute = Omit<NextRoute, 'params'> & {
    //     params: [
    //       { type: 'single', name: 'id' },
    //       { type: 'catchAll', name: 'all', optional: false },
    //       { type: 'catchAll', name: 'all-opt', optional: true },
    //     ]
    //   }
    // }
  }
}

// type A = true extends true ? 'yes' : 'no'

// type r = Routes.getByPath<Routes.AppDir, '/user/[userId]/[orderId]'>;
//
// type t = Routes.getParams<
//   Routes.getByPath<Routes.AppDir, '/user/[userId]/[orderId]'>
// >

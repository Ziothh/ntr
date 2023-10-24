import type { PAGES_ROUTES, APP_ROUTES } from '../../playground/generated/routes';
import { NextRoute } from '../generated/types';

/** Namespace containing generated Next.js routes */
export namespace Routes {
  /** `/app` dir routes */
  export type AppDir = typeof APP_ROUTES[number];
  /** `/pages` dir routes */
  export type PagesDir = typeof PAGES_ROUTES[number];

  /** `/app` & `/pages` dir routes combined */
  export type All = AppDir | PagesDir;

  export namespace Paths {
    export type AppDir = Routes.AppDir['urlPath'];
    export type PagesDir = Routes.PagesDir['urlPath'];
    export type All = Routes.Paths.AppDir | Routes.Paths.PagesDir;

    export type getParams<T extends Routes.Paths.All> = {
      [P in T]: Routes.getParams<Routes.getByPath<Routes.All, P>>
      // [P in T]: Routes.getByPath<Routes.All, P>
    }[T]
  }

  export type getByPath<R extends NextRoute, Path extends R['urlPath']> = Extract<R, { urlPath: Path }>;
  /** Get the params for a given route.
      * NOTE: not to be used in enums*/
  export type getParams<R extends NextRoute> = R['params'] extends null
    ? {}
    : {
      [K in keyof R['params']as K extends number ? R['params'][K]['key'] : never]: R['params'][K]['type'] extends 'single'
      ? string
      : string[]
    }
}

type r = Routes.getByPath<Routes.AppDir, '/user/[userId]/[orderId]'>;

type t = Routes.getParams<
  Routes.getByPath<Routes.AppDir, '/user/[userId]/[orderId]'>
>

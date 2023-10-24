import {
  NextRoute as _RustNextRoute,
  RouteParam,
  RoutePurpose,
  NextRouterEntry,
} from '../generated/rustTypes';

export type NextRoute = 
  & Omit<_RustNextRoute, 'urlPath'>
  & {
    urlPath: Path.Type,
  };

export type {
  NextRouterEntry,
  RoutePurpose,
  RouteParam,
}

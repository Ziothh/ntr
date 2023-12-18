import NextLink, { type LinkProps } from 'next/link'
import { type Route, type Path, createUrl } from './utils'
import type { Routes } from '../types/routes';

type Props<R extends Routes.Paths.All, RouteInferTypes> = Omit<
  LinkProps<RouteInferTypes>,
  'href'
> &
  (
    | Pick<LinkProps<RouteInferTypes>, 'href'>
    | {
      route: { path: R } & (
        Route.Data<Extract<R, Path.Type>> extends never
        ? {}
        : Route.Data<Extract<R, Path.Type>>
      )
    }
  )
const Link = <Route extends Routes.Paths.All, RouteInferTypes>(
  props: Props<Route, RouteInferTypes>
): JSX.Element => {
  if ('route' in props) {

    return <NextLink {...props} href={createUrl(
      props.route.path,
      // @ts-ignore // TODO: check if this works
      props.route,
    )} />;
  }

  return <NextLink {...props} />;
}

export default Link

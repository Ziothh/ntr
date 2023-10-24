import NextLink, { type LinkProps } from 'next/link'
import type { Route, Path } from './utils'
import type { Routes } from '../types/routes';

type Props<R extends Routes.All, RouteInferTypes> = Omit<
  LinkProps<RouteInferTypes>,
  'href'
> &
  (
    | Pick<LinkProps<RouteInferTypes>, 'href'>
    | {
        href: { route: R } & Route.Data<Extract<R, Path.Type>>
      }
  )
const Link = <Route extends Routes.All, RouteInferTypes>(
  props: Props<Route, RouteInferTypes>
): JSX.Element => <NextLink {...props} />

export default Link

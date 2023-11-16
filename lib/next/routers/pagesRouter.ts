import { useRouter as usePagesRouter } from 'next/router'

import { type Route, createUrl } from '../utils'
import type { Routes } from '../../types/routes'

type RouteData<Path extends Routes.Paths.All> =
  & {
    path: Path
  }
  & (Route.Data<Path> extends never ? {} : Route.Data<Path>)


type NextRoutingFn<R> = (url: string, as?: string, options?: Record<any, any>) => R;
type RoutingFn<R, Options> = <
  Path extends Routes.Paths.All,
  As extends Routes.Paths.All
>(
  url: RouteData<Path>,
  as?: RouteData<As>,
  options?: Options,
) => R


const createRoutingFn = <
  R,
  Options extends Record<any, any> | undefined
>(fn: NextRoutingFn<R>, _options: Options): RoutingFn<R, Options> => (url, as, options) => fn(
  createUrl(url.path, url as any),
  as === undefined ? undefined : createUrl(as.path, as as any),
  options
)


export function useRouter<T extends Routes.Paths.PagesDir>(currentPath?: T) {
  const { push, replace, prefetch, query, ...router } = usePagesRouter()

  return {
    currentPath,
    ...(router as Omit<typeof router, 'beforePopState'> & {
      /** Callback to execute before replacing router state */
      beforePopState: (cb: (state: NextHistoryState) => boolean) => void,
    }),
    /** Contains both the route path params and the url query parameters */
    query: query as
      & Routes.Params.get<
        // @__ts-ignore
        Routes.getByPath<Routes.PagesDir, T>
      >
      & Record<string, string | string[]>,
    push: createRoutingFn(push, undefined as unknown as TransitionOptions),
    // replace: createRoutingFn(replace, undefined as unknown as TransitionOptions),
    // prefetch: createRoutingFn(prefetch, undefined as unknown as Parameters<typeof prefetch>[2]),
  } as const;
}

// Next types that are private and are needed to be redeclared...
interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}
interface NextHistoryState {
  url: string;
  as: string;
  options: TransitionOptions;
}

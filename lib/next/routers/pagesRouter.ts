import { useRouter as usePagesRouter } from 'next/router'

import { type Route, createUrl } from '../utils'
import type { Routes } from '../../types/routes'

type RouteData<Path extends Routes.Paths.All> =
  & {
    path: Path
  }
  & (Route.Data<Path> extends never ? {} : Route.Data<Path>)

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
        // @ts-ignore
        Routes.getByPath<Routes.PagesDir, T>
      >
      & Record<string, string | string[]>,
    push<
      Path extends Routes.Paths.All,
      As extends Routes.Paths.All
    >(
      url: RouteData<Path> /* | Parameters<typeof push>[0] */,
      as?: RouteData<As> /* | Parameters<typeof push>[1] */,
      options?: TransitionOptions
    ): Promise<boolean> {
      return push(
        createUrl(url.path, url as any),
        as === undefined ? undefined : createUrl(as.path, as as any),
        options
      );
    },

    replace<
      Path extends Routes.Paths.All,
      As extends Routes.Paths.All
    >(
      url: RouteData<Path> /* | Parameters<typeof replace>[0] */,
      as?: RouteData<As> /* | Parameters<typeof replace>[1] */,
      options?: TransitionOptions
    ): Promise<boolean> {
      return replace(
        // 'path' in url ? createUrl(url.path, url) : url,
        createUrl(url.path, url as any),
        as === undefined ? undefined : createUrl(as.path, as as any),
        options
      );
    },

    prefetch<
      Path extends Routes.Paths.All,
      As extends Routes.Paths.All
    >(
      url: RouteData<Path> /* | Parameters<typeof replace>[0] */,
      as?: RouteData<As> /* | Parameters<typeof replace>[1] */,
      options?: Parameters<typeof prefetch>[2]
    ): Promise<void> {
      return prefetch(
        createUrl(url.path, url as any),
        as === undefined ? undefined : createUrl(as.path, as as any),
        options,
      );
    },
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

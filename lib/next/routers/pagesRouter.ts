import { useRouter as usePagesRouter } from 'next/router'

import { type Route, createUrl } from '../utils'
import type { Routes } from '../../types/routes'

type RouteData<Path extends Routes.Paths.PagesDir> = Route.Data<Path> & {
  path: Path
}

export function useRouter<T extends Routes.Paths.PagesDir>(currentPath?: T) {
  const { push, replace, prefetch, query, ...router } = usePagesRouter()

  return {
    currentPath,
    ...router,
    query: query as
      & Routes.getParams<
        // @ts-ignore
        Routes.getByPath<Routes.PagesDir, T>
      >
      & Record<string, string>,
    push<
      Path extends Routes.Paths.PagesDir,
      As extends Routes.Paths.PagesDir
    >(
      url: RouteData<Path> /* | Parameters<typeof push>[0] */,
      as?: RouteData<As> /* | Parameters<typeof push>[1] */,
      options?: Parameters<typeof push>[2]
    ) {
      return push(
        // 'path' in url ? createUrl(url.path, url) : url,
        createUrl(url.path, url),
        as === undefined ? undefined : createUrl(as.path, as),
        options
      );
    },

    replace<
      Path extends Routes.Paths.PagesDir,
      As extends Routes.Paths.PagesDir
    >(
      url: RouteData<Path> /* | Parameters<typeof replace>[0] */,
      as?: RouteData<As> /* | Parameters<typeof replace>[1] */,
      options?: Parameters<typeof replace>[2]
    ) {
      return replace(
        // 'path' in url ? createUrl(url.path, url) : url,
        createUrl(url.path, url),
        as === undefined ? undefined : createUrl(as.path, as),
        options
      );
    },

    refetch<Path extends Routes.Paths.PagesDir>(
      hrefTemplate: Path,
      options: Route.Data<Path>
    ) {
      return prefetch(createUrl(hrefTemplate, options));
    },
  } as const;
}

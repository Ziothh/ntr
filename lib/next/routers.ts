import appRouter from 'next/navigation'
import { useRouter as usePagesRouter } from 'next/router'

import { type Route, createUrl } from './utils'
import type { Routes } from '../types/routes'

export namespace AppDir {
  export function useRouter<T extends Routes.Paths.AppDir>(currentPath?: T) {
    const { push, replace, prefetch, ...router } = appRouter.useRouter()

    return {
      ...router,
      push: <Path extends Routes.Paths.AppDir>(
        hrefTemplate: Path,
        options: Route.Data<Path> & Parameters<typeof push>[1]
      ) => push(createUrl(hrefTemplate, options), options),

      replace: <Path extends Routes.Paths.AppDir>(
        hrefTemplate: Path,
        options: Route.Data<Path> & Parameters<typeof replace>[1]
      ) => replace(createUrl(hrefTemplate, options), options),

      prefetch: <Path extends Routes.Paths.AppDir>(
        hrefTemplate: Path,
        options: Route.Data<Path>
      ) => prefetch(createUrl(hrefTemplate, options)),
    } as const
  }

  /** @link https://nextjs.org/docs/app/api-reference/functions/use-params */
  export function useParams<T extends Routes.Paths.AppDir>(currentPath?: T) {
    return appRouter.useParams() as Routes.Paths.getParams<T>;
    // return appRouter.useParams() as T;
  }

  /** @todo */
  export function useSearchParams() {
    // return appRouter.usePathname
    return 'TODO' as 'TODO'
  }
}
export namespace PagesDir {
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
      push: <
        Path extends Routes.Paths.PagesDir,
        As extends Routes.Paths.PagesDir
      >(
        url: RouteData<Path> /* | Parameters<typeof push>[0] */,
        as?: RouteData<As> /* | Parameters<typeof push>[1] */,
        options?: Parameters<typeof push>[2]
      ) =>
        push(
          // 'path' in url ? createUrl(url.path, url) : url,
          createUrl(url.path, url),
          as === undefined ? undefined : createUrl(as.path, as),
          options
        ),

      replace: <
        Path extends Routes.Paths.PagesDir,
        As extends Routes.Paths.PagesDir
      >(
        url: RouteData<Path> /* | Parameters<typeof replace>[0] */,
        as?: RouteData<As> /* | Parameters<typeof replace>[1] */,
        options?: Parameters<typeof replace>[2]
      ) =>
        replace(
          // 'path' in url ? createUrl(url.path, url) : url,
          createUrl(url.path, url),
          as === undefined ? undefined : createUrl(as.path, as),
          options
        ),

      refetch: <Path extends Routes.Paths.PagesDir>(
        hrefTemplate: Path,
        options: Route.Data<Path>
      ) => prefetch(createUrl(hrefTemplate, options)),
    } as const
  }
}


// PagesDir.useRouter().push({
//   path: '/orders/[userId]/[orderId]',
// })

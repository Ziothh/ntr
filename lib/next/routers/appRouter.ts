import type { Routes } from "../../types/routes";
import appRouter from 'next/navigation'
import { Route, createUrl } from "../utils";

export function useRouter() {
  const { push, replace, prefetch, ...router } = appRouter.useRouter()

  return {
    ...router,
    push<Path extends Routes.Paths.AppDir>(
      hrefTemplate: Path,
      options: Route.Data<Path> & Parameters<typeof push>[1]
    ) {
      return push(createUrl(hrefTemplate, options), options);
    },

    replace<Path extends Routes.Paths.AppDir>(
      hrefTemplate: Path,
      options: Route.Data<Path> & Parameters<typeof replace>[1]
    ) {
      return replace(createUrl(hrefTemplate, options), options);
    },

    prefetch<Path extends Routes.Paths.AppDir>(
      hrefTemplate: Path,
      options: Route.Data<Path>
    ) {
      return prefetch(createUrl(hrefTemplate, options));
    },
  } as const;
}

/** @link https://nextjs.org/docs/app/api-reference/functions/use-params */
export function useParams<T extends Routes.Paths.AppDir>(currentPath?: T) {
  return appRouter.useParams() as Routes.Paths.getParams<T>;
  // return appRouter.useParams() as T;
}

/** @todo */
export function useSearchParams() {
  // return appRouter.usePathname
  return 'TODO' as 'TODO';
}

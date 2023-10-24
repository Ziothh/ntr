import type { Routes } from "../../types/routes";
import appRouter from 'next/navigation'
import { Route, createUrl } from "../utils";

/** Higher order function to create routing wrapper functions in `useRouter`. */
const createRoutingFn = <Fn extends (url: string, options?: Record<any, any>) => void>(routingFn: Fn) => {
  return function<Path extends Routes.Paths.AppDir>(
    path: Path,
    ...args: Path extends `${string}/[${string}]${string}`
    ? [options: Route.Data<Path> & Parameters<Fn>[1]]
    : [options?: Route.Data<Path> & Parameters<Fn>[1]]
  ) {
    return routingFn(createUrl(path, args[0] ?? {} as any), args[0])
  }
}

export function useRouter() {
  const { push, replace, prefetch, ...router } = appRouter.useRouter()

  return {
    ...router,
    push: createRoutingFn(push),
    replace: createRoutingFn(push),
    prefetch: createRoutingFn(push),
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

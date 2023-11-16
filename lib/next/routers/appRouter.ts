import type { Routes } from "../../types/routes";
import appRouter from 'next/navigation'
import { Route, createUrl } from "../utils";

type NavigateOptions = NonNullable<Parameters<ReturnType<typeof appRouter['useRouter']>['push']>[1]>
type NextRoutingFn = (href: string, options?: NavigateOptions) => void;
type RoutingFn<Fn extends NextRoutingFn> = <Path extends Routes.Paths.All>(
  path: Path,
  ...args: Path extends `${string}/[${string}]${string}`
    ? [options: Route.Data<Path> & NavigateOptions]
    : [options?: Route.Data<Path> & NavigateOptions]
) => ReturnType<Fn>

/** Higher order function to create routing wrapper functions in `useRouter`. */
const createRoutingFn = <Fn extends NextRoutingFn>(routingFn: Fn): RoutingFn<Fn> => {
  return function(path, ...args) {
    return routingFn(createUrl(path, args[0] ?? {} as any), args[0]) as ReturnType<typeof routingFn>
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

/** A wrapper around the next.js `useParams` app router hook.
  *
  * @param currentPath - A type hint to get the right route parameters type.
  *
  * ```typescript
  * // # Examples
    *
  * // Not passing any parameter hints
  * const params = useParams() // All possible path parameters
  * if ('id' in params) { params.id }
  *
  * // Passing the path as a parameter gives better auto completion
  * const params = useParams('/user/[id]') // { id: string }
  *
  * // Passing the path as a generic still works but gives no auto completion
  * const params = useParams<'/user/[id]'>() // { id: string }
  * ```
  * @link https://nextjs.org/docs/app/api-reference/functions/use-params 
  * */
export function useParams<T extends Routes.Paths.AppDir>(currentPath?: T) {
  return appRouter.useParams() as Routes.Paths.getParams<T>;
}

/** @todo */
export function useSearchParams(): never {
  // return appRouter.usePathname
  throw 'TODO';
}

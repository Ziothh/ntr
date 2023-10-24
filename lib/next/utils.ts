import type { PoC_Routes, Route as NextRoute } from 'next'

/*
  Utility namespaces
*/

export namespace Path {
  export type Type = `/${string}`

  export type Param<T extends string = string> = `[${T}]`

  /** Takes in any string and returns a string that starts with a `"/"` */
  export type fromString<T extends string> = T extends Path.Type ? T : `/${T}`
}

export namespace Route {
  /** Parses the parameters from the given URL path string */
  export type getParams<T extends Path.Type> =
    T extends `${infer A}/[${infer Param}]${infer B}`
      ?
          | (Param extends `...${string}`
              ? // If it's a catch-all it's allowed to be any string
                string & {}
              : Param)
          // Recursively parse the path
          | getParams<Path.fromString<`${A}${B}`>>
      : never

  export type Data<Path extends Path.Type> = {
    query?: Record<string, string>
    hash?: string
  } & (Route.getParams<Path> extends never
    ? {}
    : { params: Record<Route.getParams<Path>, string> })

  /** A namespace containing utilities to filter  */
  export namespace Filters {
    /** Filter the given `Paths` union to only contain static paths (= not containing route parameters) */
    export type getStatic<Paths extends Path.Type> = keyof {
      [P in Paths as Route.getParams<P> extends never ? P : never]: any
    }

    /** Filter the given `Paths` union to only contain dyanic paths (= paths with route parameters) */
    export type getDynamic<Paths extends Path.Type> = Exclude<
      Paths,
      Filters.getStatic<Paths>
    >
  }
}

/*
  Utility functions
*/

/** Takes in a File System Routing (FSR) `path` and returns a URL string.
 *
 * The function allows for both `app` and `pages` router paths to be passed.
 *
 * The `path` gets mutated with the given `data` to create the URL.
 * - `data.params` is a record containing dynamic route segments.
 *   E.g. `{ id: '15' }` for `'/todos/[id]'`
 * - `data.query` is a record containing the query parameters.
 *   E.g. `{ hello: 'world' }` for `'/todos'` becomes `'/todos?hello=world'`
 * - `data.hash` is the hash value for the URL.
 *   E.g. `'section-1'` for `'/todos'` becomes `'/todos#section-1'`
 *
 * @example
 * ```typescript
 * const myUrl = createUrl('/todos/[id]', {
 *   params: { id: '15' },
 *   query: { hello: 'world' },
 *   hash: 'section-1',
 * }) // '/todos/15?hello=world#section-1'
 * ```
 */
export function createUrl<Path extends PoC_Routes.AllRoutes>(
  path: Path,
  data: Route.Data<Path>
) {
  let url: string = path

  if ('params' in data)
    Object.entries<string>(data.params).forEach(
      ([key, value]) => (url = url.replaceAll(`[${key}]`, value))
    )

  const queryEntries =
    data.query === undefined ? null : Object.entries(data.query)
  if (queryEntries !== null)
    queryEntries.forEach(
      ([key, value], index) =>
        (url += `${index === 0 ? '?' : '&'}${key}=${encodeURI(value)}`)
    )

  if (data.hash !== undefined) url += `#${data.hash}`

  return url as NextRoute<any>
}

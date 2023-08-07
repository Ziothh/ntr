import { Routes } from './generated/routes';

namespace Path {
  export type Type = `/${string}`

  export type Parameter<T extends string = string> = `[${T}]`;

  /** Takes in any string and returns a string that starts with a `"/"` */
  export type fromString<T extends string> = T extends Path.Type ? T : `/${T}`

  export type getNextSegment<
    FullPath extends Path.Type,
    CurrentPath extends Path.Type | null = null
  > = FullPath extends `${CurrentPath extends null ? '' : CurrentPath}/${infer U}`
    // Check if there are subpaths
    ? U extends `${infer Z}/${string}`
    ? Z // Return the segment before the subparts
    : U
    : never

  // Appends the given `Segment` to the given path `T`
  export type join<
    P extends Path.Type | null,
    Segment extends string,
  > = Path.fromString<`${P extends null ? '' : P}${Path.fromString<Segment>}`>
}

/** Parses the parameters from the given URL path string */
type getParams<T extends Path.Type> = T extends `${infer A}/[${infer Param}]${infer B}`
  ?
  | (
    Param extends `...${string}`
    // If it's a catch-all it's allowed to be any string
    ? (string & {})
    : Param
  )
  // Recursively parse the path
  | getParams<Path.fromString<`${A}${B}`>>
  : never

type RouteMetaData = {
  [K in Routes.All]: RouteData<
    getParams<K>
  >
}

type RouteData<Params extends string = never> = {
  params: Params
}

type ParamInput<T extends RouteData<string>> = {
  [K in T['params']]: string | number
}

const navigate = <T extends keyof RouteMetaData>(
  route: T,
  params: {
    [K in RouteMetaData[T]['params']]: string | number
  }
) => {

}


const PROXY_HANDLER = {
  get(target, prop, receiver) {

  }
} satisfies ProxyHandler<any>

const createProxyState = <T extends string | null>(currentPath: T) => ({
  currentPath,
});


type ParamFunction<Proxy /* ProxyObject */> = (value: string | number) => Proxy

type ProxyObject<P extends Path.Type | null, AllowedPaths extends Path.Type> =
  // State
  & {
    readonly _path: P;
    readonly _params: Record<getParams<Exclude<P, null>>, string>
    readonly _query: Record<string, string>
  }
  // Path traversal
  & {
    [
    // Get the first next path segment
    K in Path.getNextSegment<AllowedPaths, P> as
    K extends Path.Parameter<infer Param>
    ? `$${Param}`
    : K
    ]: K extends Path.Parameter<infer Param> // Check if K is a parameter segment
    // Function to set the parameter value
    ? ParamFunction<ProxyObject<Path.join<P, `[${Param}]`>, AllowedPaths>>
    : ProxyObject<Path.join<P, K>, AllowedPaths>
  }
  // Functionality
  & (P extends AllowedPaths ? {
    // Doesn't further the path, only adds query parameters
    QUERY: (query: Record<string, string>) => ProxyObject<P, AllowedPaths>
    PUSH: () => void;
    REPLACE: () => void;
  } : {})

type Test = '/' extends '/hi' ? true : false


type A = ProxyObject<'/api', Routes.All>

const proxy = undefined as unknown as ProxyObject<null, Routes.All>;
proxy.api.trpc.$trpc('hi')
// proxy.api.trpc.trpc('hi').$push()
// proxy.api.auth['...nextauth'].

type BetterOmit<T, K extends keyof T> = Omit<T, K>

const createProxy = <
  P extends Path.Type | null,
  AllowedPaths extends Path.Type,
>(state: ProxyObject<P, AllowedPaths>): ProxyObject<P, AllowedPaths> => new Proxy(
  state,
  {
    get(target, prop, receiver) {
      // @ts-ignore
      if (prop in target || typeof prop !== 'string') return target[prop];

      if (prop.startsWith('$')) {
        // Parameter key
        return ((value) => createProxy({
          ...state,
          path: `${state._path}/${value}`
        })) satisfies ParamFunction<ProxyObject<P, AllowedPaths>>
      }

      return createProxy({
        ...state,
        _path: `${state._path}/${prop}`
      })
    },
  }
)

const createRouter = <AllowedPaths extends Path.Type>() => {
  type State = Parameters<typeof createProxy<null, AllowedPaths>>[0];

  const state: any = {
    _path: null,
    _params: {},
    _query: {},
    // @ts-ignore
    QUERY: (query: any) => createProxy({
      ...state,
      _query: query,
    } as typeof state),
    PUSH: () => {
    },
    REPLACE: () => {
    }
  } satisfies Partial<State>

  return createProxy<null, AllowedPaths>(state);
}

const router = createRouter<Routes.All>()

router.chat.PUSH()

navigate("/404", {
  id: 'hi',
  hi: '',
})

type a = getParams<'/hi/[id]/foo/bar/[user]/[...nextauth]'>

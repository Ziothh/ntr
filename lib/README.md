# @next-typed-routes/lib

NOTE: This package is a WIP and is subject to change.

This library aims to make using next.js routing and api calls more type safe.
It does so by providing a wrapped and/or extended version of hooks, provided by next.js.

## Setup
### Installation
```bash
$ pnpm add @next-typed-routes/lib
# Downloads the library from npm (routing)
# and rust binary release (for route types codegen)
```

### Transpilation of JSX files
This package currently needs to be transpiled by next to use the `Link` component.
```typescript
// next.config.mjs

const config = {
  // -- snip
  transpilePackages: ['@next-typed-routes/lib'],
  // -- snip
};

export default config;
```

### Generating routing types
Altough the library works in a route agnostic way without generating types, 
its purpose is kinda defeated by skipping this step.

```bash
# Run the binary to generate the route types
$ pnpm ntr # or use pnpm ntr ~/path/to/project if not in cwd

Parsing project at "/path/to/project"

> Wrote types to @next-typed-routes/lib
> Wrote ts generated output to "/path/to/project/generated/routes.ts"
```

## Utilisation
### App router
```typescript
// ~/app/page.tsx

import { useAppRouter, routers, appRouter } from '@next-typed-routes/lib';

export default () => {
  const router = useAppRouter();
  // Or use one of the alternative ways. The API is still being worked on.
  // const router = routes.appRouter.useRouter()
  // const router = appRouter.useRouter()

  // Specify the current path template in `useParams` and get a typed object back
  const { userId, orderId } = appRouter.useParams('/user/[userId]/[orderId]');

  router.push('/user'); // Works

  // @ts-expect-error
  router.push('/products/[id]/[variant]'); // Needs id & variant parameters

  // Solution:
  router.push('/products/[id]/[variant]', {
    params: {
      id: 'some-uuid',
      variant: 'first',
    },
    // Optional extra properties
    hash: 'optional-hash',
    query: { hello: 'world '}
  }); // `/products/some-uuid/first?hello=world#optional-hash`

  return null;
}
```

### Pages router
```typescript
// ~/pages/index.tsx

import { usePagesRouter } from '@next-typed-routes/lib';

export default () => {
  const router = usePagesRouter();

  router.push({ path: '/user' }); // Works

  // @ts-expect-error
  router.push({
    path: '/products/[id]/[variant]'
    // TS error: ... Property 'params' is missing in type ... 
  }); // Needs id & variant parameters

  // Solution:
  router.push({
    path: '/products/[id]/[variant]',
    params: {
      id: 'some-uuid',
      variant: 'first',
    },
    // Optional extra properties
    hash: 'optional-hash',
    query: { hello: 'world '}
  }); // `/products/some-uuid/first?hello=world#optional-hash`

  return null;
}
```

### Create URL
```typescript
// /some/file/.tsx?

import { createUrl } from "@next-typed-routes/lib";

const userUrl = createUrl('/user'); // `/user`

// @ts-expect-error
// Expected 2 arguments, but got 1.
const myUrl = createUrl('/app-router/optional/[[...optional]]');

// Solution:
const myUrl = createUrl('/app-router/optional/[[...optional]]', {
  params: { optional: ['foo', 'bar', 'baz',] }, // { optional?: string[] | undefined; }
  // Optional extra properties
  hash: 'optional-hash',
  query: { hello: 'world ' }
}); // `/app-router/optional/foo/bar/baz?hello=world#optional-hash`
```

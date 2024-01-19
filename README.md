# Next Typed Routes
These packages make routing in next.js intuitive and type-safe.

This projects functions as a replacement for the `typedRoutes` experimental `next.js` feature untill the interface becomes easier to use.
[The discussion to improve the `next.js` feature can be found here](https://github.com/vercel/next.js/discussions/55499).

WIP: The package is fully functional but the API is subject to change. 

## Features
 - [x] Analyze `next.js` routes and generate types with the `ntr` command.
 - [x] Use the routing types in the lib to make routing type safe.
 - [ ] Type safe query parameters.
 - [ ] Type safe API calls to next.js route APIs.

## [npm:`@next-typed-routes/lib`](https://www.npmjs.com/package/@next-typed-routes/lib)
This is the main package of this monorepo and contains the TypeScript code for the npm package.

For documentation on the library go to the [README in `/lib`](./lib/README.md).

## The `ntr` command
This command generates type information about the routes in the `next.js` project.

A version matching with the library is released on every `v*.*.*` tag via [github actions](./.github/workflows/bin-release.yaml).

For documentation on its usage with the library go to the [README in `/lib`](./lib/README.md).

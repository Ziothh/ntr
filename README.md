# Next Typed Routes
These packages make routing intuitive and type-safe.

WIP

## Library
For documentation on the library go to the [README in `/lib`](./lib/README.md).

## TODOs
### CLI
 - [x] Specify project location
 - [ ] OutFiles
    - [x] override `/node_modules/@next-typed-routes/lib` routing types
    - [x] `generated/routes.ts` file containing `app` & `pages` info
        - [ ] Specify `outFile`
    - [ ] `generated/{appRoutes, pages}.json` if asked for?
 - [ ] Tests

### Lib
 - [x] Type safe routing to pages (`/pages/**/*.tsx` | `/app/**/page.tsx`)
    <!-- - [ ] Support multiple occurances of the same path parameter (if allowed by next) -->
    - [ ] Typed `/app` page Query parameters (by importing from `route.ts`)
 - [ ] Type safe fetching for route handlers (`/pages/**/*.ts` | `/app/**/route.ts`)
 - [ ] Dev UI

## Bugs
 - [x] Catch-all routes don't work
 - [ ] Parent index is scoped to the router instead of all pages
 - [ ] Give router buiders instead of router instances because of React context issues
    - [ ] hook builders
    - [ ] Stop generating types in node modules since it's not needed anymore

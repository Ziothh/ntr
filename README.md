# Next Typed Routes
These packages make routing intuitive and type-safe.

WIP

## TODOs
### CLI
 - [x] Specify project location
 - [ ] OutFiles
    - [x] override `/node_modules/@next-typed-routes/lib` routing types
    - [x] `generated/routes.ts` file containing `app` & `pages` info
        - [ ] Specify `outFile`
        - [ ] Make optional by default
    - [ ] `generated/{appRoutes, pages}.json` if asked for?
 - [ ] Tests

### Lib
 - [x] Type safe routing to pages (`/pages/**/*.tsx` | `/app/**/page.tsx`)
    - [ ] Support multiple occurances of the same path parameter
    - [ ] Typed `/app` page Query parameters (by importing from `route.ts`)
 - [ ] Type safe fetching for route handlers (`/pages/**/*.ts` | `/app/**/route.ts`)
 - [ ] Dev UI

## Bugs
 - [ ] Parent index is scoped to the router instead of all pages
 - [ ] Catch-all routes don't work

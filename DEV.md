# DEV docs

## Notes
 - `./lib/generated/routes.d.ts` has been frozen via `update-index --assume-unchanged`.

## Versioning
`changesets` is broken for `pnpm` workspaces at the moment.

## Git
`freeze = update-index --assume-unchanged`
`thaw = update-index --no-assume-unchanged`

## TODOs
 - [ ] More examples
 - [ ] Move TODOs to github project

### CLI
 - [x] Specify project location
 - [ ] OutFiles
    - [x] override `/node_modules/@next-typed-routes/lib` routing types
    - [x] `generated/routes.ts` file containing `app` & `pages` info
        - [ ] Specify custom `outFile` dir
    - [ ] `generated/{appRoutes, pages}.json` if asked for?
 - [ ] Tests

### Lib
 - [x] Type safe routing to pages (`/pages/**/*.tsx` | `/app/**/page.tsx`)
    <!-- - [ ] Support multiple occurances of the same path parameter (if allowed by next) -->
    - [ ] Typed `/app` page Query parameters (by importing from `route.ts`)
 - [ ] Type safe API calls to (`/pages/**/*.ts` | `/app/**/route.ts`)
 - [ ] Dev UI

### Bugs
 - [x] Catch-all routes don't work
 <!-- - [ ] Give router buiders instead of router instances because of React context issues -->
 <!--    - [ ] hook builders -->
 <!--    - [ ] Stop generating types in node modules since it's not needed anymore -->
 <!-- - [ ] Parent index is scoped to the router instead of all pages -->


## Github
### Releasing binaries
https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository

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

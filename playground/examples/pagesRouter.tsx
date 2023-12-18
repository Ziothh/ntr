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

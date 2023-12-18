// ~/app/page.tsx

import { useAppRouter, routers } from '@next-typed-routes/lib';

export default () => {
  const router = useAppRouter();

  // Specify the current path template in `useParams` and get a typed object back
  const params = routers.appRouter.useParams('/user/[userId]/[orderId]');
  // Type of params: { userId: string, orderId: string }
  const { userId, orderId } = params;

  router.push('/user'); // Works

  // @ts-expect-error
  router.push('/products/[id]/[variant]'); // Needs id & variant parameters
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

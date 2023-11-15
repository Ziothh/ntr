import { appRouter } from '@next-typed-routes/lib';


appRouter
  .useRouter()
  .push('/products/[id]/[variant]', {
    params: {
      id: 'hi',
      variant: 'hiiii'
    }
  });

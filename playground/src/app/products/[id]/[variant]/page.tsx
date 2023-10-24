import { appRouter } from "@acme/lib";

export default () => {
  const router = appRouter.useRouter()

  router.push('/products/[id]/[variant]');
  
  return null;
};

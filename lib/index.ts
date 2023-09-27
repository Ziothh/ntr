import { useRouter as NextusePageRouter } from 'next/router';
import { useRouter as NextuseAppRouter } from 'next/navigation'
import { Routes } from './generated/routes';

const router = {
  pages: NextusePageRouter(),
  app: NextuseAppRouter()
} as const;

router.pages.route

const useAppRouter = () => undefined;
const usePagesRouter = () => undefined;


const routers = createRouter({
  404: route(),
  todos: route()
});


type RouteData<Overrides> = {
  [K in Routes.All]: {
    params: Record<Path.getParams<K>, string | number>
    query?: Record<string, string>
  }
}


const r = undefined as unknown as {
  push: NavigateFunction,
};

type NavigateFunction = <Route extends Routes.All>(route: Route, data: RouteData<any>[Route]) => Promise<boolean>

r.push('/fuel-plans', {
  params: { id: 1 }
})

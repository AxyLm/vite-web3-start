import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  RouteRecordRaw,
} from 'vue-router';
import '@varlet/ui/es/snackbar/style';
import { type App } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    appBar?: boolean;
    batTitle?: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    redirect: 'home',
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('~/views/home/index.vue'),
    meta: {
      barTitle: 'home',
    },
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('~/views/about/index.vue'),
    meta: {
      barTitle: 'about',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'home',
  },
];

const beforeEach: NavigationGuardWithThis<undefined> = (to, from, next) => {
  next();
};

export { routes };

export const install = (app: App<Element>) => {
  const router = createRouter({
    routes,
    history: createWebHistory(),
  });
  router.beforeEach(beforeEach);

  app.use(router);
};

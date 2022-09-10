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
    tabBar?: boolean;
    batTitle?: string;
    authorization?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    component: () => import('~/views/home/index.vue'),
    meta: {
      appBar: true,
      barTitle: 'Home',
    },
  },
  {
    name: 'perpetual',
    path: '/perpetual',
    component: () => import('~/views/perpetual/index.vue'),
    meta: {
      appBar: true,
      barTitle: 'Perpetual',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'perpetual',
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

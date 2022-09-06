import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import '@varlet/ui/es/snackbar/style';

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
const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, _from) => {
  // const { isConnect } = useWeb3Store();
  // if (!isConnect) {
  //   setProvider('MetaMask');
  // }
});

declare module 'vue-router' {
  interface RouteMeta {
    appBar?: boolean;
    tabBar?: boolean;
    batTitle?: string;
    authorization?: boolean;
  }
}

export { router };

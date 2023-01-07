import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router';
import useEthereumStore, { connectEthereum } from '~/web3/hooks/useEthereumStore';

const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    component: () => import('~/layout/index.vue'),
    children: [
      {
        name: 'Index',
        path: '',
        component: () => import('~/views/index.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      },
    ],
  },
];

export { routes };

export const routerInstance = createRouter({
  routes,
  history: createWebHistory(),
});

const beforeEach: NavigationGuard = async (to, from, next) => {
  try {
    const store = useEthereumStore();
    if (!store.accountConnected) {
      await connectEthereum();
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

routerInstance.beforeEach(beforeEach);

import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router';
import { connectEthereum } from '~/modules/connector/metamask-connect';
import { useEthereumStore } from '~/stores/ethereum.store';

const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    component: () => import('~views/layout/index.vue'),
    redirect: 'wallet',
    children: [
      {
        name: 'Wallet',
        path: 'wallet',
        component: () => import('~views/pages/wallet/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export { routes };

export const routerInstance = createRouter({
  routes,
  history: createWebHistory(),
});

const beforeEach: NavigationGuard = async (to, from, next) => {
  try {
    const { ethereumState } = useEthereumStore();
    if (!ethereumState.accountConnected.value) {
      await connectEthereum();
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

routerInstance.beforeEach(beforeEach);

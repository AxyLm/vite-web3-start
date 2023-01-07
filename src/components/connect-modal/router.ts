import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router';
import useEthereumStore, { connectEthereum } from '~/web3/hooks/useEthereumStore';

const routes: RouteRecordRaw[] = [
  {
    name: 'ConnectModal',
    path: '/',
    component: () => import('./index.vue'),
    children: [
      {
        name: 'WalletConnect',
        path: 'connectwallet',
        component: () => import('./item/wallet-connect.vue'),
      },
    ],
  },
];

export { routes };

export const modalRouterInstance = createRouter({
  routes,
  history: createWebHistory(),
});

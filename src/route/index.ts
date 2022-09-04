import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import '@varlet/ui/es/snackbar/style';
import { useWeb3Store } from '~/stores/web3';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3 } from '~/web3/web3';
import { provider } from '~/web3';

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
  const { connectWallet, isConnect } = useWeb3Store();
  if (typeof window.ethereum !== 'undefined' && !isConnect) {
    console.log('MetaMask is installed!');

    const ethereum = window.ethereum;
    const nerwork = await provider.ready;
    const eth_accounts = await ethereum.request?.({
      method: 'eth_accounts',
    });
    if (eth_accounts.length) {
      const [address] = eth_accounts;
      connectWallet(address, {
        chain: nerwork.chainId,
      });
    }
  }
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

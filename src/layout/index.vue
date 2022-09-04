<template>
  <div class="layout h-full">
    <div class="layout-wrap" :style="{}">
      <app-bar />
      <router-view class="container" />
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import AppBar from './header.vue';
  import { useRoute } from 'vue-router';
  import { useWeb3Store } from '~/stores/web3';
  import { setProvider, provider } from '~/web3';
  import { Web3Provider } from '@ethersproject/providers';

  export default defineComponent({
    name: 'Layout',
    components: {
      AppBar,
    },
    setup() {
      const route = useRoute();
      const web3Store = useWeb3Store();
      const { address, connectWallet, chainId, chainChange } = web3Store;
      const meta = computed(() => route.meta);

      async function getWallet() {
        if (typeof window.ethereum !== 'undefined') {
          web3Store.ethereumInstalled = true;
          console.log('MetaMask is installed!');

          const ethereum = window.ethereum;
          const nerwork = await provider.ready;
          const eth_accounts = await ethereum.request?.({
            method: 'eth_accounts',
          });
          if (eth_accounts.length) {
            const [address] = eth_accounts;
            connectWallet(address, nerwork.chainId);
          }

          ethereum.on('accountsChanged', (accounts: string[]) => {
            console.log('accountsChanged', nerwork);
            connectWallet(accounts[0], nerwork.chainId);
          });

          ethereum.on('chainChanged', (_chainId: number) => {
            console.log('_chainId', _chainId);
            const { chainId } = useWeb3Store();
            setProvider(new Web3Provider(ethereum));
            if (_chainId !== chainId) {
              chainChange(_chainId);
            }
          });
        }
      }
      getWallet();
      return {
        route,
        meta,
      };
    },
  });
</script>
<style lang="less" scoped>
  .layout {
    position: relative;

    .layout-wrap {
      width: 100%;
      // overflow: hidden visible;
      .container {
        padding: 1rem;
        margin: 0 auto;
        min-height: 100vh //calc(100vh - var(--app-bar-height));;
      }
    }
  }
</style>

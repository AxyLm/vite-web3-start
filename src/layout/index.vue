<template>
  <div class="layout h-full">
    <div class="layout-wrap" :style="{}">
      <app-bar />
      <router-view class="container" />
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import AppBar from './header.vue';
  import { useRoute } from 'vue-router';
  import { useWeb3Store } from '~/stores/web3';
  import { setProvider } from '~/web3';

  export default defineComponent({
    name: 'Layout',
    components: {
      AppBar,
    },
    setup() {
      const route = useRoute();
      const meta = computed(() => route.meta);

      return {
        route,
        meta,
      };
    },
    beforeCreate() {
      const web3Store = useWeb3Store();

      const ethereum = window.ethereum;
      if (typeof ethereum !== 'undefined') {
        setProvider('MetaMask');

        if (ethereum.isConnected()) {
          web3Store.setConnectInfo(ethereum.selectedAddress, ethereum.chainId);
        }

        ethereum.on('accountsChanged', ([account]: string[]) => {
          console.log('accountsChanged', account);
          if (account) {
            web3Store.setConnectInfo(account);
          } else {
            web3Store.$reset();
          }
        });
        ethereum.on('chainChanged', (_chainId: number) => {
          console.log('chainChanged,', _chainId);
          setProvider('MetaMask');
          web3Store.setConnectInfo(ethereum.selectedAddress, _chainId);
        });
      }
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

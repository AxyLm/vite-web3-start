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

        web3Store.connectByProvider();

        // listener accounts，chain
        ethereum.on('accountsChanged', ([account]: string[]) => {
          if (account) {
            web3Store.setConnectInfo(account);
          } else {
            web3Store.$reset();
          }
        });
        ethereum.on('chainChanged', (_chainId: number) => {
          setProvider('MetaMask');
          web3Store.connectByProvider();
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
      }
    }
  }
</style>

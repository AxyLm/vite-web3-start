<template>
  <header
    class="header sticky top-0 z-20 inset-x-0 flex items-center justify-between px-4 sm:h-20 sm:px-7.5 xl:px-10 border-b border-b-white/5"
  >
    <div class="flex items-center gap-2">
      <router-link to="/">
        <Favicon class="h-6 w-6" />
      </router-link>
      <span class="text-xl text-white/80">Moseu</span>

      <!-- <div class="ml-2 flex gap-4 sm:ml-8">
        <router-link
          v-for="item in links"
          :key="item.link"
          :to="item.link"
          class="sm:mr-1.25 mr-1 rounded-lg p-2 px-1 text-sm text-white/70 sm:inline sm:text-md"
          active-class="text-white/100"
        >
          <span>
            {{ item.label }}
          </span>
        </router-link>
      </div> -->
    </div>

    <div class="flex h-full items-center gap-2 sm:gap-4">
      <template v-if="accountConnected">
        <network />
      </template>
      <template v-else>
        <!-- <button
          class= h-9 items-center rounded-md border bg-transparent px-2 text-sm leading-9 dark:border-white/20 sm:flex sm:px-4"
          @click="connectWallet()"
        >
          <icon-cil:wallet class="mr-2 inline" />
          <span>Connect Wallet</span>
        </button> -->
      </template>

      <a href="https://github.com/AxyLm/vite-web3-start" target="_blank" class="block">
        <icon-carbon:logo-github class="h-6 w-6" />
      </a>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EthereumStore } from '~/stores/ethereum.store';
  import { mapState } from 'pinia';
  import network from '~/views/components/network.vue';
  import { connectAccount } from '~/modules/connector/metamask-connect';
  import Favicon from '~icons/logo/favicon.svg';
  export default defineComponent({
    name: 'AppHeader',
    components: {
      network,
      Favicon,
    },
    setup() {
      const connectWallet = () => {
        connectAccount();
      };

      const switchNetwork = () => {
        // store.connectors.switchChain(ChainIds.BSC);
      };

      const addressFilter = (adr?: string) => {
        if (!adr || adr.length < 10) return;
        adr = adr.toLocaleUpperCase();
        return `${adr.substring(0, 4)}...${adr.substring(adr.length - 4, adr.length)}`;
      };

      return {
        addressFilter,
        switchNetwork,
        connectWallet,
      };
    },
    computed: {
      ...mapState(EthereumStore, ['accountConnected', 'account']),
      links() {
        return [
          {
            label: 'Buy',
            link: '/buy',
          },
        ];
      },
    },
  });
</script>
<style lang="less" scoped>
  // .header {
  //   height: 60px;
  //   backdrop-filter: blur(4px);
  //   background: transparent 0 0 no-repeat padding-box;
  //   border-bottom: 1px solid hsla(0, 0%, 100%, 0.062745098);
  //   @apply text-base-13 dark:text-base-1;
  // }

  .header {
    height: 60px;
    background: rgba(255, 255, 255, 0.7) !important;
    backdrop-filter: blur(12px) !important;
    box-shadow: 0px 0px 25px 5px rgb(10 10 10 / 12%) !important;
    @apply text-base-13 dark:text-base-1;

    .bar-title {
      @apply font-bold text-base-13 dark:text-base-1;
    }
  }

  .dark {
    .header {
      background: rgba(40, 40, 40, 0.5) !important;
      box-shadow: 0px 0px 25px 5px rgb(0 0 0 / 12%) !important;
    }
  }
</style>

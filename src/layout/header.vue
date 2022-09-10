<template>
  <header class="header sticky top-0 flex h-20 items-center justify-between px-4 md:px-10">
    <div class="bar-title pl-2 md:pl-4">
      <template v-if="$route.meta.barTitle">{{ $t(`${$route.meta.barTitle}.bar_title`) }}</template>
    </div>

    <div class="flex pr-2 md:pr-4">
      <div
        v-if="isConnect && address"
        class="min-w-10 mr-2 h-10 overflow-hidden sm:mr-4 sm:overflow-auto"
      >
        <div
          class="h-10 w-10 rounded-full bg-skin-400 p-2 text-center dark:bg-skin-700 sm:h-10 sm:w-auto sm:p-2 sm:text-left sm:dark:bg-skin-900"
        >
          <icon-cryptocurrency:eth
            v-if="network.chain == 1"
            class="text-2xl leading-10 sm:text-2xl"
          />
          <icon-cryptocurrency:bnb
            v-if="network.chain == 56"
            class="text-2xl leading-10 sm:text-2xl"
          />
          <span class="ml-2 hidden align-middle sm:inline">{{ network?.name }}</span>
        </div>
      </div>

      <div
        :class="[
          'relative mr-2 py-1 px-1 sm:mr-4',
          !isConnect || 'connected flex items-center  px-0.5 text-base-11 dark:text-base-1',
        ]"
      >
        <div
          :class="[
            'absolute top-0 left-0 -z-10 h-full w-full rounded-full bg-skin-400 opacity-0 dark:bg-skin-900 sm:opacity-100',
            isConnect || 'sm:opacity-0',
          ]"
        ></div>
        <div v-if="isConnect" class="m-w-4 mx-2 ml-3 hidden h-6 leading-6 sm:block">
          <span v-if="balance == null" class="text-md">
            <icon-eos-icons:three-dots-loading />
          </span>
          <span v-else>{{ balance }} {{ network.symbol }}</span>
        </div>
        <button
          :loading="false"
          class="connect-btn"
          :disabled="isConnect"
          size="large"
          @click="connectMetaMask"
        >
          {{ isConnect ? addressFilter(address) : 'Connect' }}
        </button>
      </div>
      <button
        class="mr-2 cursor-pointer leading-8 text-skin-600 dark:text-skin-500"
        @click="toggleDark()"
      >
        <icon-carbon-sun v-if="!isDark" class="h-10 w-6" />
        <icon-carbon-moon v-else class="h-10 w-6" />
      </button>
      <a href="https://github.com/AxyLm/vite-web3" target="_blank" class="">
        <button class="mr-2 hidden text-center text-skin-600 dark:text-skin-500 sm:mr-4 sm:block">
          <icon-carbon:logo-github class="h-10 w-6" />
        </button>
      </a>
    </div>
  </header>
</template>

<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { isDark, toggleDark } from '~/composables';
  import { useWeb3Store } from '~/stores/web3';
  import { connectWallet } from '~/web3';

  export default defineComponent({
    name: 'AppBar',
    computed: {
      ...mapState(useWeb3Store, ['address', 'isConnect', 'balance', 'network']),
    },
    setup() {
      const route = useRoute();

      const connectMetaMask = async () => {
        if (window.ethereum) {
          connectWallet();
        } else {
          const isConfirm = window.confirm('Not fount MetaMask, Do you want to install it?');
          if (isConfirm) {
            window.open('https://metamask.io/download/');
          }
        }
      };

      const addressFilter = (adr?: string) => {
        if (!adr || adr.length < 10) return;
        adr = adr.toLocaleUpperCase();
        return `${adr.substring(0, 6)}...${adr.substring(adr.length - 3, adr.length)}`;
      };
      return {
        connectMetaMask,
        addressFilter,
        toggleDark,
        isDark,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
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

  .connect-btn {
    @apply transition-colors;
    @apply h-8 rounded-full px-2 font-normal dark:ring-offset-1;
    @apply bg-skin-300 outline-skin-700  dark:bg-skin-600 dark:outline-skin-700;
    @apply ring-skin-200 ring-offset-base-light hover:ring-2 active:bg-skin-300  dark:ring-skin-500 dark:ring-offset-base-dark;
    @apply dark:ring-offset-skin-900 dark:active:bg-skin-700 dark:active:ring-skin-500;

    @apply disabled:active:bg-skin-300  dark:disabled:active:bg-skin-600;
  }

  .connected {
    .connect-btn {
      @apply cursor-text select-text hover:ring-0;
    }
  }
</style>

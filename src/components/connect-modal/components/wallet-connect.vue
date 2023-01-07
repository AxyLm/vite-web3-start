<template>
  <div
    class="connect-item bg-skin-200 hover:bg-skin-200 no-animation btn flex h-14 w-full cursor-pointer items-center justify-start rounded-md py-4 px-6"
  >
    <!-- <div class="py-1 w-6"> <img src="../../assets/svg/wallet-connect.svg" alt="" srcset="" /> </div> -->
    <div v-if="!connectUri">await init</div>
    <div v-else class="ml-2">{{ connectUri }} {{ connectStore.connectUri }}</div>
  </div>
</template>

<script lang="ts">
  import { mapState, storeToRefs } from 'pinia';
  import { defineComponent, markRaw } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';

  import { useWalletConnectStore } from '../hooks/useWalletConnect';
  import { useConnectModal } from '~/components/connect-modal/hooks/useConnectorModal';
  export default defineComponent({
    name: 'WalletConnectRouter',

    async setup() {
      const ethereumStore = useEthereumStore();
      const connectStore = useWalletConnectStore();

      const { connectUri, universalProvider } = storeToRefs(connectStore);
      const useModal = useConnectModal();

      await connectStore.initClient();
      await connectStore.requestConnection();

      return {
        connectStore,
        universalProvider,
        connectUri,
      };
    },
    computed: {
      ...mapState(useEthereumStore, ['account', 'chainId', 'balance', 'accountConnected']),
    },
  });
</script>

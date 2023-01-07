<template>
  <button
    v-if="!accountConnected"
    class="btn-primary btn-sm btn flex items-center rounded-full px-4 text-white"
    @click="openConnectModal()"
  >
    Connect
  </button>
</template>

<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';
  import { useConnectModal } from '~/components/connect-modal/hooks/useConnectorModal';

  export default defineComponent({
    name: 'Connector',
    components: {},

    setup() {
      const connectStore = useConnectModal();
      const openConnectModal = () => {
        connectStore.open();
      };
      return {
        openConnectModal,
      };
    },
    computed: {
      ...mapState(useEthereumStore, ['account', 'chainId', 'balance', 'accountConnected']),
    },
  });
</script>

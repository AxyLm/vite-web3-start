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
  import { useConnectModal } from '~/components/connector-modal/connectors/useConnectorModal';

  export default defineComponent({
    name: 'Connector',
    components: {},

    setup() {
      const { open } = useConnectModal();

      const openConnectModal = async () => {
        open();
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

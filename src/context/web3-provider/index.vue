<script lang="ts">
  import { defineComponent } from 'vue';
  import { MetaMaskConnector, WalletConnectConnector } from '~/connectors';
  export default defineComponent({
    name: 'ConnectorContext',
    components: {},
    setup() {
      const connectors = [
        new MetaMaskConnector({
          appUrl: 'http://localhost:3000',
        }),
        new WalletConnectConnector({}),
      ];

      return {
        connectors,
      };
    },
  });
</script>
<template>
  <slot></slot>

  <board :connectors="connectors" dark>
    <!-- <template #loading>
      <div v-if="wallet.status === 'loading'"></div>
    </template> -->
  </board>
</template>

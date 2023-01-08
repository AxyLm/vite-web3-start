<script lang="ts">
  import { defineComponent } from 'vue';
  import MetaMaskVue from './connectors/metamask.vue';
  import WalletConnectVue from './connectors/wallet-connect.vue';
  import { useConnectModal } from './connectors/useConnectorModal';
  import { mapState } from 'pinia';

  export default defineComponent({
    components: {
      MetaMaskVue,
      WalletConnectVue,
    },
    setup(props) {
      const { updateStatus, close } = useConnectModal();

      const closeModal = () => {
        updateStatus('none');
        close();
      };
      return {
        closeModal,
      };
    },
    computed: {
      ...mapState(useConnectModal, ['modalActived', 'status']),
    },
  });
</script>

<template>
  <Modal :modal-open="modalActived" @close="closeModal()">
    <template v-if="status === 'connecting'">
      <div class="text-center">
        <p class="text-xl">Connecting...</p>
        <p class="textlg mt-4">Approve or reject request using your wallet</p>
      </div>
    </template>
    <template v-else-if="status === 'loading'">
      <div class="text-center"> <icon-eos-icons:loading class="my-8 h-6 w-6" /> </div>
    </template>
    <!-- <template v-else-if="status === 'connected'">
      <div class="text-center"> <icon-eos-icons:loading class="my-8 h-6 w-6" /> </div>
    </template> -->
    <template v-else>
      <div class="flex flex-col gap-2">
        <MetaMaskVue />
        <WalletConnectVue />
      </div>
    </template>
  </Modal>
</template>

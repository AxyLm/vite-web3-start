<script lang="ts">
  import { shallowRef, defineComponent } from 'vue';
  import { useConnectModal } from './hooks/useConnectorModal';
  import MetamaskConnector from './item/metamask.vue';
  import walletConnectItem from './item/wallet-connect.vue';
  import { mapState } from 'pinia';
  export default defineComponent({
    name: 'ConnectModal',
    components: {
      MetamaskConnector,
      walletConnectItem,
    },
    setup() {
      const connectModalStore = useConnectModal();
      const modal = shallowRef(null);

      function closeModal() {
        connectModalStore.close();

        setTimeout(() => {
          connectModalStore.activedComponent = undefined;
        }, 1000);
      }

      const connected = (e: string) => {
        closeModal();
      };
      return {
        connected,
        closeModal,
      };
    },

    computed: {
      ...mapState(useConnectModal, ['modalActived', 'activedComponent']),
    },
  });
</script>
<template>
  <Teleport to="body">
    <div
      class="modal bg-black/75 dark:bg-base-13/50"
      :class="{ 'modal-open': modalActived }"
      style="backdrop-filter: blur(9.9px)"
      @click.self="closeModal"
    >
      <div ref="modal" class="rounded-6 dark:bg-skin-100 modal-box max-w-3xl p-6">
        <div class="mb-8 flex w-full justify-between text-xl">
          <span class="">Connect Wallet</span>
          <div class="text-2xs cursor-pointer" @click="closeModal">X</div>
        </div>

        <div class="flex flex-col gap-2">
          <MetamaskConnector @account-connected="connected" />
          <walletConnectItem @account-connected="connected" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
  import { PropType, computed, defineComponent, inject, onMounted, ref, toRefs } from 'vue';
  import Modal from '../modal.vue';

  import metamaskVue from '~/components/connector-board/connectors/metamask.vue';
  import WalletConnectVue from '~/components/connector-board/connectors/wallet-connect.vue';
  import { useBoard } from '../../composables/useBoard';
  import { useConnectModal } from '~/components/connect-modal/hooks/useConnectorModal';
  import { mapState } from 'pinia';

  export default defineComponent({
    components: {
      Modal,
      metamaskVue,
      WalletConnectVue,
    },
    props: {},
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
    <!-- <div v-click-outside="close"> -->
    <template v-if="status === 'connecting'">
      <div class="loading-modal">
        <p>Connecting...</p>
        <p class="mt-4">Approve or reject request using your wallet</p>
      </div>
    </template>
    <template v-else-if="status === 'loading'">
      <div class="text-center"> <icon-eos-icons:loading class="my-8 h-6 w-6" /> </div>
    </template>
    <template v-else>
      <div class="flex flex-col gap-2">
        <metamaskVue @close="closeModal()" />
        <WalletConnectVue @close="closeModal()" />
      </div>
    </template>
  </Modal>
</template>

<style scoped>
  .wallet-item {
    display: flex;
    justify-content: center;
    padding: 1rem 1rem 0.6rem;
    margin: 0.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
  }

  .wallet-item:hover {
    background-color: rgba(236, 237, 239, 0.737);
  }

  /* dark mode */
  .wallet-item--dark {
    display: flex;
    justify-content: center;
    padding: 1rem 1rem 0.6rem;
    margin: 0.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
    color: rgb(199, 199, 199);
  }

  .wallet-item--dark:hover {
    background-color: #101a20;
  }

  @media (min-width: 640px) {
    .wallet-item {
      width: 24rem;
    }
    .wallet-item--dark {
      width: 24rem;
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .item > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .line {
    border-color: #e5e7eb;
    border-width: 0px;
    border-bottom-width: 1px;
    border-style: solid;
  }

  .line--dark {
    border-color: rgba(195, 195, 195, 0.14);
    border-width: 0px;
    border-bottom-width: 1px;
    border-style: solid;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .wallet-disabled {
    opacity: 0.5;
  }

  .wallet-disabled:hover {
    background-color: rgba(255, 255, 255, 0);
    cursor: default;
  }

  .loading-modal {
    width: 20rem;
    padding: 2.5rem;
    text-align: center;
  }

  .loading-modal > p:first-child {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  @media (min-width: 640px) {
    .loading-modal {
      width: auto;
    }
  }
</style>

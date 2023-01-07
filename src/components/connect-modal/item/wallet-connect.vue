<template>
  <div
    class="connect-item bg-skin-200 hover:bg-skin-200 no-animation btn flex h-14 w-full cursor-pointer items-center justify-start rounded-md py-4 px-6"
    :class="{ loading: loading }"
    @click="connect()"
  >
    <!-- <div class="py-1 w-6"> <img src="../../assets/svg/wallet-connect.svg" alt="" srcset="" /> </div> -->
    <div class="ml-2">Wallet Connect</div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent, defineEmits, ref } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';
  import { storeToRefs } from 'pinia';

  import { useWalletConnectStore } from '../hooks/useWalletConnect';
  import { useConnectModal } from '~/components/connect-modal/hooks/useConnectorModal';
  import ChildrenComponent from '../components/wallet-connect.vue';

  export default defineComponent({
    name: 'ConnectorWalletConnect',
    emits: {
      accountConnected(account: string) {
        return !!account;
      },
    },
    setup(props, { emit }) {
      const ethereumStore = useEthereumStore();
      const connectStore = useWalletConnectStore();
      const useModal = useConnectModal();
      const loading = ref(false);
      // const { initialized, connectUri, address, client } = storeToRefs(connectStore);
      // connectStore.init();

      const connect = async () => {
        loading.value = true;
        // useModal.activedComponent = ChildrenComponent;
        await connectStore.initClient();
        loading.value = false;

        await connectStore.requestConnection();

        emit('accountConnected', ethereumStore.account!);
      };

      return {
        loading,
        connect,
      };
    },
    computed: {
      ...mapState(useEthereumStore, ['account', 'chainId', 'balance', 'accountConnected']),
    },
  });
</script>

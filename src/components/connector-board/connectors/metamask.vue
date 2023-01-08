<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent, onBeforeMount, ref, toRefs, defineEmits } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';

  import { connectAccount, setProvider } from '~/web3/hooks/useProvider';
  import { providers } from 'ethers';
  import Logo from './logos/MetaMask.vue';
  import { MetaMaskProvider } from '~/connectors';
  import { useBoard } from '~/composables/useBoard';
  import { useConnectModal } from '~/components/connect-modal/hooks/useConnectorModal';

  export default defineComponent({
    name: 'MetaMaskConnector',
    components: {
      Logo,
    },
    props: {
      isAutoConnect: {
        type: Boolean,
        default: () => true,
      },
    },

    setup(props) {
      const { isAutoConnect } = toRefs(props);
      const { updateStatus, close } = useConnectModal();
      const isLoading = ref(false);

      const store = useEthereumStore();

      const connectWallet = async () => {
        if (window.ethereum) {
          isLoading.value = true;
          updateStatus('connecting');
          setProvider(new providers.Web3Provider(window.ethereum));
          connectAccount()
            .then((res) => {
              updateStatus('connected');
              close();
            })
            .catch((e) => {
              console.log(e);
              updateStatus('none');
            })
            .finally(() => {
              updateStatus('connected');
              isLoading.value = false;
            });
        }
      };
      const onClickWallet = async () => {
        if (store.accountConnected) return false;
        connectWallet();
      };

      onBeforeMount(() => {
        if (isAutoConnect.value && typeof window !== 'undefined' && !!window.ethereum) {
          const provider = window.ethereum as MetaMaskProvider;
          if (provider.selectedAddress && !store.accountConnected) {
            connectWallet();
          }
        }
      });

      return {
        isLoading,
        onClickWallet,
      };
    },
    computed: {
      ...mapState(useEthereumStore, ['account', 'chainId', 'balance', 'accountConnected']),
    },
  });
</script>
<template>
  <button
    class="connect-item-metamask bg-skin-200 hover:bg-skin-200 no-animation btn flex h-14 w-full cursor-pointer items-center justify-start rounded-md py-4 px-6"
    @click="onClickWallet()"
  >
    <Logo class="py-1 h-6 w-6" />
    <div class="ml-2">Meta Mask</div>
  </button>
</template>

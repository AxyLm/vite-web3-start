<script lang="ts">
  import { mapState } from 'pinia';
  import { PropType, defineComponent, ref, shallowReactive, shallowRef } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';

  import { WalletConnectConnector } from '~/connectors';
  import { connectAccount, setProvider } from '~/web3/hooks/useProvider';
  import { providers } from 'ethers';
  import Logo from './logos/WalletConnect.vue';
  import { useBoard } from '~/composables/useBoard';
  import { useConnectModal } from '~/components/connect-modal/hooks/useConnectorModal';

  export default defineComponent({
    name: 'WalletConnectConnector',
    components: {
      Logo,
    },
    emits: {
      accountConnected(account: string) {
        return !!account;
      },
      close: () => {
        return true;
      },
    },
    setup(props, { emit }) {
      const walletConnector = shallowReactive(new WalletConnectConnector({}));
      const { updateStatus, close } = useConnectModal();

      const isLoading = ref(false);

      const onClickWallet = async () => {
        isLoading.value = true;
        updateStatus('loading');
        try {
          const { account, provider } = await walletConnector.connect();
          updateStatus('connecting');

          setProvider(new providers.Web3Provider(provider));
          await connectAccount();
          updateStatus('connected');
          emit('accountConnected', account);
        } catch (err: any) {
          updateStatus('none');

          console.log(err);
        } finally {
          isLoading.value = false;
          emit('close');
        }
      };

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
  <div
    class="connect-item bg-skin-200 hover:bg-skin-200 no-animation btn flex h-14 w-full cursor-pointer items-center justify-start rounded-md py-4 px-6"
    :class="{ loading: isLoading }"
    @click="onClickWallet()"
  >
    <div class="py-1 w-6"> <Logo class="h-6 w-6" /> </div>
    <div class="ml-2">Wallet Connect</div>
  </div>
</template>

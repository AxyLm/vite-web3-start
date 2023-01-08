<script lang="ts">
  import { mapState } from 'pinia';
  import { PropType, defineComponent, ref, shallowReactive, shallowRef } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';
  import QRCodeModal from '@walletconnect/qrcode-modal';

  import { connectAccount, setProvider } from '~/web3/hooks/useProvider';
  import { providers } from 'ethers';
  import Logo from './logos/WalletConnect.vue';
  import { useConnectModal } from './useConnectorModal';
  import { getAddress } from 'ethers/lib/utils';
  import UniversalProvider from '@walletconnect/universal-provider';

  const PROJECT_ID = 'bd2399e0c5e4cc2a448515e65fc9b887';

  const namespance = {
    eip155: {
      methods: [
        'eth_accounts',
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
        '_signTypedData',
        'eth_signTypedData_v4',
      ],
      chains: ['eip155:56'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {
        56: `https://rpc.walletconnect.com?chainId=eip155:56&projectId=${PROJECT_ID}`,
      },
    },
  };

  export default defineComponent({
    name: 'WalletConnectConnector',
    components: {
      Logo,
    },
    setup() {
      const { updateStatus, close } = useConnectModal();

      const isLoading = ref(false);

      const provider = shallowRef<UniversalProvider>();

      const onClickWallet = async () => {
        try {
          if (!provider.value) {
            updateStatus('loading');

            provider.value = await UniversalProvider.init({
              logger: 'warn',
              relayUrl: 'wss://relay.walletconnect.com',
              projectId: PROJECT_ID,
              metadata: {
                name: 'Quickswap',
                description: 'Quickswap of dappos',
                url: window.location.href,
                icons: ['/favicon.png'],
              },
            });

            provider.value.once('display_uri', (e: string) => {
              updateStatus('connecting');
              QRCodeModal.open(e, () => {
                console.log('EVENT', 'QR Code Modal closed');
              });
            });
          }
          updateStatus('connecting');
          setProvider(new providers.Web3Provider(provider.value));
          await provider.value.connect({
            namespaces: namespance,
          });

          const accounts = await provider.value.enable();
          if (accounts.length == 0) return Promise.reject('account not found');
          await connectAccount();
          updateStatus('connected');
          QRCodeModal.close();
          close();
        } catch (err: any) {
          console.log(err);
        } finally {
          updateStatus('none');
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
    @click="onClickWallet()"
  >
    <Logo class="py-1 h-6 w-6" />
    <div class="ml-2">Wallet Connect</div>
  </div>
</template>

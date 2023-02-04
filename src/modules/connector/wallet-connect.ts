import { ethers } from 'ethers';
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed, watch, shallowRef } from 'vue';
import SignClient from '@walletconnect/sign-client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import UniversalProvider from '@walletconnect/universal-provider';
import { useConnectedNetwork } from '~/stores/hooks/use-network';
import { useEthereumStore } from '~/stores/ethereum.store';
import { useProvider } from '~/composables/use-provider';

const PROJECT_ID = '58ab318eb4080a7a4e53297a62ebd861';

export enum WalletConnectEvents {
  CONNECT = 'connect',
  DISPLAY_URI = 'display_uri',
  DISCONNECT = 'disconnect',

  CHAIN_CHANGE = 'chainChanged',
  ACCOUNT_CHANGE = 'accountsChanged',
}
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
    chains: ['eip155:56','eip155:1'],
    events: ['chainChanged', 'accountsChanged'],
    rpcMap: {
      // 56: `https://rpc.walletconnect.com?chainId=eip155:56&projectId=${PROJECT_ID}`,

      // TODO: set provider rpc
      56: 'https://rpc.ankr.com/bsc',
      1: 'https://eth.rpc.blxrbdn.com	',
    },
  },
};

const singClientOption = {
  // relayUrl: 'wss://relay.walletconnect.com',
  projectId: PROJECT_ID,
  metadata: {
    name: 'Vite Start',
    description: 'vite web3 dapp start',
    url: window.location.host,
    icons: [`${window.location.origin}/favicon.svg`],
  },
};

export const WalletConnectStore = defineStore('WalletConnectStore', () => {
  const connectUri = ref<string | null>(null);

  const client = shallowRef<SignClient>();
  const universalProvider = shallowRef<UniversalProvider>();
  const initialized = computed(() => !!universalProvider.value);
  const { ethereumStore, ethereumState } = useEthereumStore();
  const networkStore = useConnectedNetwork();

  // reactive auth error
  const error = ref<string | null>(null);
  const { setProvider } = useProvider();

  const setError = (e: unknown) => {
    error.value = e?.toString() ?? null;
    console.error(e);
  };

  // Init client and listen to auth events
  const init = async () => {
    const signClient = await SignClient.init(singClientOption).catch((e) => {
      setError(e);
      return e;
    });
    client.value = signClient;
    await UniversalProvider.init({ client: signClient })
      .then((e) => {
        universalProvider.value = e;
      })
      .catch((e) => {
        setError(e);
        return e;
      });
  };

  watch(universalProvider, () => {
    if (!universalProvider.value) {
      return;
    }

    console.log('linster');
    universalProvider.value.on(WalletConnectEvents.DISPLAY_URI, (e: string) => {
      connectUri.value = e;
      QRCodeModal.open(e, () => {
        console.log('EVENT', 'QR Code Modal closed');
      });
    });

    universalProvider.value.client.on('session_delete', (e) => {
      console.log('session_delete');
      setProvider(undefined);
      ethereumStore.reset();
    });

    universalProvider.value.client.on('session_ping', (e) => {
      console.log('session_ping');
      console.log(e);
    });

    universalProvider.value.client.on('session_update', async (e) => {
      console.log('session_update');
      console.log(e);

      if (universalProvider.value) {
        const web3Provider = new ethers.providers.Web3Provider(universalProvider.value);
        setProvider(web3Provider);

        // const provider = new ethers.providers.Web3Provider(client.value)
        const account = await web3Provider.getSigner().getAddress();
        if (account) {
          ethereumState.account.value = account;
          const { chainId } = await web3Provider.getNetwork();
          networkStore.setNetwork(chainId);
        } else {
          ethereumStore.reset();
        }
      } else {
        ethereumStore.reset();
      }
    });

    universalProvider.value.on(WalletConnectEvents.CONNECT, async (e: string) => {
      const web3Provider = new ethers.providers.Web3Provider(universalProvider.value!);
      setProvider(web3Provider);

      // const provider = new ethers.providers.Web3Provider(client.value)
      const account = await web3Provider.getSigner().getAddress();
      if (account) {
        ethereumState.account.value = account;
        const { chainId } = await web3Provider.getNetwork();
        networkStore.setNetwork(chainId);
      } else {
        ethereumStore.reset();
      }
      QRCodeModal.close();
    });
  });

  const reset = async () => {
    connectUri.value = null;
    error.value = null;
    if (universalProvider.value) {
      await universalProvider.value.disconnect();
    }
  };

  const requestConnection = async () => {
    if (!universalProvider.value) {
      return;
    }
    await universalProvider.value.disconnect().finally(
      () =>
        universalProvider.value &&
        universalProvider.value.connect({ namespaces: namespance }).catch((e) => {
          setError(e);
          return e;
        }),
    );
  };

  return {
    client,
    universalProvider,
    connectUri,
    initialized,
    error,

    init,
    reset,

    requestConnection,
  };
});

export const useWalletConnectStore = () => {
  const walletConnectStore = WalletConnectStore();
  const walletConnectState = storeToRefs(walletConnectStore);
  return {
    walletConnectStore,
    walletConnectState,
  };
};

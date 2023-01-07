import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, shallowRef, triggerRef, watch, watchEffect, watchSyncEffect } from 'vue';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { connectEthereum, useEthereumStore } from '~/web3/hooks/useEthereumStore';
import { ethers } from 'ethers';
import UniversalProvider from '@walletconnect/universal-provider';
import { setProvider, getProvider, connectAccount } from '~/web3/hooks/useProvider';
// import { setProvider } from '~/web3/hooks/web3Provider';

const PROJECT_ID = 'bd2399e0c5e4cc2a448515e65fc9b887';

const UniversalProviderOpts = {
  logger: 'warn',
  relayUrl: 'wss://relay.walletconnect.com',
  projectId: PROJECT_ID,
  metadata: {
    name: 'Quickswap',
    description: 'Quickswap of dappos',
    url: window.location.href,
    icons: ['/favicon.png'],
  },
};

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

export const useWalletConnectStore = defineStore('walletConnect', () => {
  const universalProvider = shallowRef<UniversalProvider>();

  universalProvider.value?.events.on('connection', (e) => {
    console.log(e);
  });

  const connectUri = computed(() => {
    const uri = universalProvider.value?.uri;
    return uri;
  });

  const sessionAccount = computed((): [string, string, string] => {
    const namespaceAccount = universalProvider.value?.session?.namespaces['eip155']?.accounts[0];
    const [namespace, chain, account] = namespaceAccount ? namespaceAccount.split(':') : [];
    return [namespace, chain, account];
  });
  const initClient = async () => {
    if (universalProvider.value) return universalProvider.value;
    const client = await UniversalProvider.init(UniversalProviderOpts);
    try {
      await client.disconnect();
    } catch (error) {
      console.log(error);
    }
    universalProvider.value = client;
    // if (cli.session?.peer.metadata.url) {
    //   requestConnection(cli.session.topic);
    //   return;
    // }
    if (client.uri) {
      openConnectModal();
      return;
    }
    const timer = setInterval(() => {
      if (universalProvider.value?.uri) {
        triggerRef(universalProvider);
        clearInterval(timer);
      }
    }, 10);
    watchEffect(() => {
      console.log(universalProvider.value?.uri);
      if (universalProvider.value?.uri) {
        openConnectModal();
      }
    });
    return client;
  };

  const openConnectModal = () => {
    if (universalProvider.value?.uri) {
      console.log(universalProvider.value.uri);
      QRCodeModal.open(universalProvider.value.uri, () => {
        console.log('EVENT', 'QR Code Modal closed');
      });
    }
  };
  const requestConnection = async (topic?: string) => {
    if (!universalProvider.value) return;
    console.log('connect start');
    await universalProvider.value
      .connect({
        namespaces: namespance,
        pairingTopic: topic,
      })
      .then((e) => {
        console.log('==> connected');
        QRCodeModal.close();
        console.log(e);

        console.log(sessionAccount);
        connectProvider();
      })
      .catch((e) => {
        universalProvider.value?.disconnect();
        console.log(e);
      })
      .finally(() => {
        console.log('finally');
      });
  };

  const connectProvider = async () => {
    if (!universalProvider.value) return;
    const web3Provider = new ethers.providers.Web3Provider(universalProvider.value);
    setProvider(web3Provider);

    await connectAccount();
  };

  return {
    connectUri,
    sessionAccount,
    initClient,
    requestConnection,
    universalProvider,
  };
});

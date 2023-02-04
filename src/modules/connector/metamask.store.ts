import { ethers } from 'ethers';
import { defineStore } from 'pinia';
import { computed, shallowRef, watch } from 'vue';
import { getProvider, useProvider } from '~/composables/use-provider';
import { useEthereumStore } from '~/stores/ethereum.store';
import { useConnectedNetwork } from '~/stores/hooks/use-network';

export const MetaMaskStore = defineStore('MetaMaskStore', () => {
  const ethereum = shallowRef((window as Window).ethereum);
  const metamaskProvider = shallowRef<ethers.providers.Web3Provider>();
  const initialized = computed(() => !!metamaskProvider.value);

  const { provider, setProvider } = useProvider();

  if (ethereum.value) {
    ethereum.value.removeListener('chainChanged', handChainChanged);
    ethereum.value.removeListener('accountsChanged', handAccountsChanged);

    ethereum.value.on('chainChanged', handChainChanged);
    ethereum.value.on('accountsChanged', handAccountsChanged);

    metamaskProvider.value = new ethers.providers.Web3Provider(ethereum.value);

    ethereum.value.request({ method: 'eth_accounts' }).then((e) => {
      if (e[0]) {
        connectEthereum();
      }
    });
  }

  function handChainChanged(e: number) {
    const _provider = new ethers.providers.Web3Provider(ethereum.value!);
    setProvider(_provider);

    // connectEthereum();
    const networkStore = useConnectedNetwork();
    networkStore.updateNetwork();
  }
  function handAccountsChanged(e: string[]) {
    const { ethereumStore, ethereumState } = useEthereumStore();
    if (e[0]) {
      ethereumState.account.value = e[0];
    } else {
      ethereumStore.reset();
    }
  }

  async function connectEthereum() {
    if (!ethereum.value) return;

    const [account] = await ethereum.value.request({ method: 'eth_accounts' });
    if (!metamaskProvider.value) return;

    setProvider(metamaskProvider.value);
    const { ethereumStore, ethereumState } = useEthereumStore();
    const networkStore = useConnectedNetwork();
    if (account) {
      const { chainId } = await metamaskProvider.value.getNetwork();
      ethereumState.account.value = account;
      networkStore.setNetwork(chainId);
    } else {
      ethereumStore.reset();
    }
  }

  const requestConnect = async () => {
    if (!ethereum.value) return;
    if (!metamaskProvider.value) {
      metamaskProvider.value = new ethers.providers.Web3Provider(ethereum.value);
    }
    const [account] = await metamaskProvider.value.send('eth_requestAccounts', []).catch((e) => {
      console.log('[MetaMask] ', e?.message);
      return [];
    });
    if (account) {
      connectEthereum();
    }
  };

  watch(metamaskProvider, () => {
    if (metamaskProvider.value && provider.value) {
      setProvider(metamaskProvider.value);
    }
  });

  return {
    metamaskProvider,
    initialized,
    ethereum,
    requestConnect,
  };
});

/**
 * MetaMask
 * Docs: https://docs.metamask.io/guide/ethereum-provider.html
 * JSON RPC API: https://metamask.github.io/api-playground/api-documentation
 */
export interface MetaMaskProvider extends MetaMaskEthereumProvider {
  isMetaMask: boolean;
  providers?: MetaMaskProvider[];
  isConnected: () => boolean;
  request: (request: { method: string; params?: any[] | undefined }) => Promise<any>;
  selectedAddress: string;
}

/**
 * source: @metamask/detect-provider
 * https://github.com/MetaMask/detect-provider/blob/main/src/index.ts
 */
export interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

export interface Window {
  ethereum?: MetaMaskProvider;
}

export const ethereum = (window as Window).ethereum;

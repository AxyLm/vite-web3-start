import { ethers } from 'ethers';
import { computed, shallowRef } from 'vue';
import { ethAccounts } from '~/web3/hooks/ethereum-metods';
import useEthereumStore, { connectEthereum } from './useEthereumStore';

type Provider = ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;

const _providerWithSigner = shallowRef<Provider>();

const provider = computed(() => {
  return _providerWithSigner.value;
});

export const setProvider = (p: Provider) => {
  _providerWithSigner.value = p;
};

export const getProvider = () => {
  return _providerWithSigner.value;
};

export const getSinger = () => {
  if (!provider.value) throw Error('provider no found');
  return provider.value.getSigner();
};

// brower reloads check connect
export async function isConnected(): Promise<boolean> {
  if (!window.ethereum) return false;
  const [currentAccount] = await ethAccounts();
  return !!currentAccount;
}

export async function connectAccount(): Promise<void> {
  const provider = getProvider();
  if (!provider) throw Error('provider not found');
  const [account] = await provider.send('eth_requestAccounts', []).catch((e) => {
    console.log('[MetaMask] ', e?.message);
    return [];
  });
  const ethereumStore = useEthereumStore();
  if (account) {
    const { chainId, name, ensAddress } = await provider.getNetwork();
    ethereumStore.connect({
      account,
      network: { chainId, name, ensAddress },
    });
  } else {
    ethereumStore.reset();
  }
}

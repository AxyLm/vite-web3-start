import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { useWeb3Store } from '~/stores/web3';

let _provider: Web3Provider;

enum ProviderNames {
  metaMask = 'MetaMask',
  coinBase = 'CoinbaseWallet',
  tokenPocket = 'TokenPocket',
}

const web3Provider = () => {
  return _provider;
};

function setProvider(name?: string) {
  // default set metamask provider
  if (!name || typeof name !== 'string') name = ProviderNames.metaMask;

  if (name === ProviderNames.metaMask) {
    if (!window.ethereum) throw Error('ethereum is not defined');

    if (window.ethereum) {
      _provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  if (name === ProviderNames.coinBase && window.ethereum) {
    console.log(window.ethereum.selectedProvider);

    const coinBaseProvider = window.ethereum.providers?.find(
      (e: { isCoinbaseWallet: boolean }) => e.isCoinbaseWallet,
    );
    if (coinBaseProvider) {
      _provider = new ethers.providers.Web3Provider(coinBaseProvider);
    }
  }

  if (name === ProviderNames.tokenPocket && window.ethereum) {
    _provider = new ethers.providers.Web3Provider(window.ethereum);
  }
}

function getProvider() {
  if (!_provider) throw Error('provider is no defind');
  return _provider;
}

async function connectWallet() {
  const network = await getProvider().getNetwork();
  const accounts = await getProvider()
    .send('eth_requestAccounts', [])
    .catch((e) => {
      console.log('[MetaMask] ', e?.message);
      return [];
    });
  if (accounts.length) {
    const { setConnectInfo } = useWeb3Store();
    const [account] = accounts;
    setConnectInfo(account, network.chainId);
  }
}

export { web3Provider, setProvider, getProvider, connectWallet };

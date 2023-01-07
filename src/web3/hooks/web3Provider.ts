import { ethers } from 'ethers';
import { ethAccounts } from '~/web3/hooks/ethereum-metods';
import { connectEthereum } from './useEthereumStore';

export function getProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(window.ethereum);
}

export function getSinger(): ethers.providers.JsonRpcSigner {
  const provider = getProvider();
  return provider.getSigner();
}

// brower reloads check connect
export async function isConnected(): Promise<boolean> {
  if (!window.ethereum) return false;
  const [currentAccount] = await ethAccounts();
  return !!currentAccount;
}

export async function connectAccount(): Promise<void> {
  const [account] = await getProvider()
    .send('eth_requestAccounts', [])
    .catch((e) => {
      console.log('[MetaMask] ', e?.message);
      return [];
    });
  if (account) {
    connectEthereum();
  }
}

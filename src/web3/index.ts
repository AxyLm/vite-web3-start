import { Web3Provider } from '@ethersproject/providers';

let provider: Web3Provider;
if (typeof window.ethereum !== 'undefined') {
  const ethereum = window.ethereum;
  provider = new Web3Provider(ethereum);
}

export { provider };

export function setProvider(_provider: Web3Provider) {
  provider = _provider as Web3Provider;
}

export * from './web3';
export * from './configs';

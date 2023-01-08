export enum ChainId {
  ETHEREUM = 1,
  BNBCHAIN = 5,
}

export const CHAIN_NAMES = {
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.BNBCHAIN]: 'BNB Chain',
};

export interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name?: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export const NETWORK_DETAILS: { [key: number]: AddEthereumChainParameter } = {
  [ChainId.ETHEREUM]: {
    chainId: '0x' + ChainId.ETHEREUM.toString(16),
    chainName: CHAIN_NAMES[ChainId.ETHEREUM],
    rpcUrls: [
      'https://cloudflare-eth.com',
      'https://rpc.ankr.com/eth',
      'https://main-rpc.linkpool.io',
    ],
    blockExplorerUrls: ['https://etherscan.io'],
    nativeCurrency: {
      symbol: 'ETH',
      decimals: 18,
    },
  },

  [ChainId.BNBCHAIN]: {
    chainId: '0x' + ChainId.BNBCHAIN.toString(16),
    chainName: CHAIN_NAMES[ChainId.BNBCHAIN],
    rpcUrls: ['https://bsc-dataseed3.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
    nativeCurrency: {
      symbol: 'BNB',
      decimals: 18,
    },
  },
};

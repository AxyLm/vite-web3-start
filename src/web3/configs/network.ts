export interface Network {
  chain: number;
  networkId?: string | number;
  symbol: string;
  name: string;
  decimal?: number;
  scan?: string;
}

export const Networks: Network[] = [
  // 以太坊经典
  {
    chain: 61,
    networkId: 1,
    name: 'Ethereum',
    symbol: 'ETC',
  },
  {
    chain: 1,
    networkId: 1,
    name: 'Ethereum',
    scan: 'https://etherscan.io',
    symbol: 'ETH',
  },
  {
    chain: 10,
    name: 'Optimism Ethereum',
    scan: 'https://optimism.etherscan.com',
    symbol: 'ETH',
  },
  {
    chain: 56,
    networkId: 56,
    name: 'BNB Chain',
    scan: 'https://bscscan.com',
    symbol: 'BNB',
  },
  {
    chain: 137,
    networkId: 137,
    name: 'Polygon',
    scan: 'https://polygonscan.com',
    symbol: 'MATIC',
  },
  {
    chain: 43114,
    networkId: 43114,
    name: 'Avax',
    scan: 'https://snowtrace.io',
    symbol: 'AVAX',
  },
  {
    chain: 321,
    networkId: 321,
    name: 'kcc',
    scan: 'https://explorer.kcc.io/en',
    symbol: 'KCC',
  },
  {
    chain: 8217,
    name: 'Klaytn',
    scan: 'https://scope.klaytn.com',
    symbol: 'KLAY',
  },
  {
    chain: 25,
    name: 'Cronos',
    scan: 'https://singlefinance.xstaking.sg',
    symbol: 'CRO',
  },
];

export function getNetwork(chain: number): Network | undefined {
  const n = Networks.find((e) => e.chain === chain);
  if (!n) throw Error('not found network');
  return n;
}

export function getNetworks(chains: number[]): Network[] {
  return Networks.filter((e) => chains.includes(e.chain));
}

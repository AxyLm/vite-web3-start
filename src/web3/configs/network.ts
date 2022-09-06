export interface NetWorkConfig {
  chain: number;
  networkId?: string | number;
  symbol: string;
  name: string;
  decimal?: number;
  scan?: string;
}

const netWorkInfo: NetWorkConfig[] = [
  {
    chain: 1,
    networkId: 1,
    name: 'Ethereum',
    scan: 'https://cn.etherscan.com/',
    symbol: 'ETH',
  },
  // 以太坊经典
  {
    chain: 61,
    networkId: 1,
    name: 'Ethereum',
    symbol: 'ETC',
  },
  {
    chain: 10,
    name: 'Optimism Ethereum',
    scan: 'https://optimism.etherscan.com/',
    symbol: 'KOR',
  },
  {
    chain: 56,
    networkId: 56,
    name: 'BNB Chain',
    scan: 'https://bscscan.com/',
    symbol: 'BNB',
  },
];

export { netWorkInfo };

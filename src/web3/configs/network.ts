export interface NetWorkConfig {
  chain: number;
  symbol: string;
  name: string;
  decimal?: number;
  scan?: string;
}

const netWorkInfo: NetWorkConfig[] = [
  {
    chain: 1,
    name: 'Ethereum',
    scan: 'https://cn.etherscan.com/',
    symbol: 'ETH',
  },
  {
    chain: 10,
    name: 'Optimism Ethereum',
    scan: 'https://optimism.etherscan.com/',
    symbol: 'KOR',
  },
  {
    chain: 56,
    name: 'BSC Mainet',
    scan: 'https://bscscan.com/',
    symbol: 'BNB',
  },
];

export { netWorkInfo };

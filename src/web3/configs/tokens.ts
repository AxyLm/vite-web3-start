export interface TokenInfo {
  name?: string;
  symbol?: string;
  decimals?: number;
  address: string;
  balance?: number | string | undefined | null;
}

const eth_ERC20 = [
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    balance: undefined,
  },
  {
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    balance: undefined,
  },
  {
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    symbol: 'SHIB',
    name: 'SHIBA INU',
    decimals: 18,
    balance: undefined,
  },

  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    decimals: 8,
    balance: undefined,
  },
  {
    address: '0x3832d2F059E55934220881F831bE501D180671A7',
    symbol: 'renDOGE',
    name: 'renDOGE',
    decimals: 8,
    balance: undefined,
  },
  {
    address: '0x7c8161545717a334f3196e765d9713f8042EF338',
    symbol: 'Cake',
    name: 'PancakeSwap Token',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    symbol: 'UNI',
    name: 'Uniswap',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x85f138bfEE4ef8e540890CFb48F620571d67Eda3',
    symbol: 'WAVAX',
    name: 'Wrapped AVAX',
    decimals: 18,
    balance: undefined,
  },
];

const bsc_ERC20 = [
  {
    address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    symbol: 'BTCB',
    name: 'BTCB Token',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    symbol: 'ETH',
    name: 'Ethereum Token',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    symbol: 'BUSD',
    name: 'BUSD Token',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
    symbol: 'DOGE',
    name: 'Dogecoin',
    decimals: 8,
    balance: undefined,
  },
  {
    address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    symbol: 'DAI',
    name: 'Dai Token',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x3d6545b08693dae087e957cb1180ee38b9e3c25e',
    symbol: 'ETC',
    name: 'Ethereum Classic',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    symbol: 'Cake',
    name: 'PancakeSwap Token',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
    symbol: 'SHIB',
    name: 'SHIBA INU',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0x1ce0c2827e2ef14d5c4f29a091d735a204794041',
    symbol: 'AVAX',
    name: 'Avalanche',
    decimals: 18,
    balance: undefined,
  },
  {
    address: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
    symbol: 'UNI',
    name: 'Uniswap',
    decimals: 18,
    balance: undefined,
  },
];

export { eth_ERC20, bsc_ERC20 };

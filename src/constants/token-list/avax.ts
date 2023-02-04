import { ethers } from 'ethers';
import { Token } from '~/constants/token';

export default [
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
    address: ethers.constants.AddressZero,
  },
  {
    symbol: 'USDT',
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    decimals: 6,
  },
  {
    symbol: 'USDC',
    address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    decimals: 6,
  },
  {
    symbol: 'BUSD',
    address: '0x9C9e5fD8bbc25984B178FdCE6117Defa39d2db39',
    decimals: 18,
  },
  {
    name: 'Wrapped AVAX',
    symbol: 'WAVAX',
    decimals: 18,
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  },
  {
    name: 'Ethereum (WETH.e)',
    symbol: 'ETH',
    address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    decimals: 18,
  },
  {
    name: 'Bitcoin (BTC.b)',
    symbol: 'BTC',
    address: '0x152b9d0FdC40C096757F570A51E494bd4b943E50',
    decimals: 8,
  },
  {
    name: 'Bitcoin (WBTC.e)',
    symbol: 'WBTC',
    address: '0x50b7545627a5162F82A992c33b87aDc75187B218',
    decimals: 8,
  },
] as Token[];

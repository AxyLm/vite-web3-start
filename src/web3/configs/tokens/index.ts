import bsc from './bsc';
import eth from './eth';

export const bsc_ERC20: Token[] = bsc;
export const eth_ERC20: Token[] = eth;

export interface Token {
  address: string;
  symbol: string;
  decimals?: number;
  name?: string;
  logo?: string;
}

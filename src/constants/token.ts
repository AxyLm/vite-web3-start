import { ChainIds } from '~/constants/enums/chain-id';
import avax from './token-list/avax';
import bsc from './token-list/bsc';
import eth from './token-list/eth';
export interface Token {
  symbol: string;
  address: string;
  decimals: number;
  name?: string;
  icon?: string;
}

export const TokenLists: Record<ChainIds, Token[]> = {
  [ChainIds.AVAX]: avax,
  [ChainIds.BSC]: bsc,
  [ChainIds.ETHEREUM]: eth,
};

export function getTokenBySymbol(chain: ChainIds, symbol: string): Token {
  const token = TokenLists[chain].find((e) => e.symbol === symbol);
  if (!token) throw Error(`Token not found ${chain} ${symbol}`);
  return token;
}

export function getTokenBySymbols(chain: ChainIds, symbols: string[]): Token[] {
  return TokenLists[chain].filter((e) => symbols.includes(e.symbol));
}

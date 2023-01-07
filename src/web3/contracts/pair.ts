// 0x89d065572136814230A55DdEeDDEC9DF34EB0B76

import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, Signer } from 'ethers';
import { BaseContract } from '~/web3/contracts/base-contract';
import abi from './abis/pair.json';

export class Pair extends BaseContract {
  async totalSupply(): Promise<number> {
    const result = await this.read('totalSupply');
    return result;
  }

  async getReserves(): Promise<[number, number, number]> {
    const result: [number, number, number] = await this.read('getReserves');
    return result;
  }

  async getLpAmount(): Promise<number> {
    const totalSupply = await this.totalSupply();
    const [reserve0, reserve1] = await this.getReserves();
    return (reserve1 * 2) / totalSupply;
  }
}

export const createPair = (address: string, provider: Provider) => {
  return new Pair(address, abi, provider);
};

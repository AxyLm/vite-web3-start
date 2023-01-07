// 0x89d065572136814230A55DdEeDDEC9DF34EB0B76

import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, Signer } from 'ethers';
import { BaseContract } from '~/web3/contracts/base-contract';
import abi from './abis/mini-chefv2.json';

export class FarmVault extends BaseContract {
  async getUserInfo(user: string, pid: number): Promise<[BigNumber, BigNumber]> {
    const result = await this.read('userInfo', [pid, user]);
    return result;
  }

  async getPendingReward(user: string, pid: number): Promise<number> {
    try {
      const result = await this.read('pendingReward', [pid, user]);
      return result;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

export const createFarmVault = (address: string, providerOrSinger: Provider) => {
  return new FarmVault(address, abi, providerOrSinger);
};

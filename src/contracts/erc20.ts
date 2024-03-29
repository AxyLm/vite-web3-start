import { BigNumber, ethers, Signer } from 'ethers';
import { narrow, ExtractAbiFunctions, ExtractAbiFunction } from 'abitype';
import { BaseContract } from './base-contract';
import erc_20_abi from './abis/erc-20.json';

export class ERC20 extends BaseContract {
  async setApprove(spender: string, amount = ethers.constants.MaxUint256) {
    const res = await this.write('approve', [spender, amount], {});
    const tx = await res.wait(1);
    return tx;
  }

  async getAllowance(owner: string, spender: string): Promise<BigNumber> {
    const result = await this.read('allowance', [owner, spender]);
    return result;
  }

  async getBalanceOf(wallet: string) {
    const result = await this.read('balanceOf', [wallet]);
    return result;
  }

  async getName() {
    const result = await this.read('name');
    return result;
  }
  async getSymbol() {
    const result = await this.read('symbol');
    return result;
  }
  async getTotalSupply() {
    const result = await this.read('totalSupply');
    return result;
  }

  async getDecimals() {
    const result = await this.read('decimals');
    return result as number;
  }

  static init(address: string, provider: ethers.providers.Provider, signer?: Signer) {
    return new ERC20(address, erc_20_abi, provider, signer);
  }
}

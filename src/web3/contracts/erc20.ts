import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, ethers, Signer } from 'ethers';
import { BaseContract } from '~/web3/contracts/base-contract';
import erc_20_abi from './abis/erc-20.json';

class ERC20 extends BaseContract {
  async approve(spender: string, amount = ethers.constants.MaxUint256) {
    const res = await this.write('approve', [spender, amount], {
      gasLimit: 55762,
    });
    return res;
  }

  async getBalanceOf(wallet: string) {
    const result = await this.read('balanceOf', [wallet]);
    return result as BigNumber;
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
}
function createERC20(address: string, signerOrProvider?: Signer | Provider) {
  return new ERC20(address, erc_20_abi, signerOrProvider);
}
export { createERC20 };

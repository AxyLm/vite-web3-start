import { type ContractInterface, ethers, Contract } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/abstract-provider';

function calculateGasMargin(value: BigNumber) {
  return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}

export type Parameters = (string | number | object)[];

class BaseContract extends Contract {
  async read(method: string, parameters: Parameters = []) {
    const result = await this[method].apply(null, parameters);
    return result;
  }
  async write(
    method: string,
    parameters: Parameters,
    options: { gasPrice?: number; gasLimit?: number; value?: string },
  ): Promise<TransactionResponse> {
    const contractWithSigner = await this.contractWithSigner();

    const gasEstimate = !options.gasLimit
      ? await contractWithSigner.estimateGas[method].apply(null, parameters)
      : BigNumber.from(options.gasLimit);

    const _gasLimit = calculateGasMargin(gasEstimate);
    const feeOption = {
      ...options,
      gasLimit: _gasLimit,
    };
    parameters.push(feeOption);
    const tx: TransactionResponse = await contractWithSigner[method].apply(null, parameters);
    return tx;
  }
}

export { BaseContract };

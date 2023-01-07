import { type ContractInterface, ethers, Contract } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { getSinger } from '~/web3/hooks/web3Provider';
const DEFAULT_LIMIT = 300000;

function calculateGasMargin(value: BigNumber) {
  return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}

interface WriteOption {
  gasPrice?: number;
  gasLimit?: number;
  value?: string;
}

export type Parameters = (string | number | object)[];

class BaseContract {
  readonly provider;
  readonly signer;
  private readonly _contract: ethers.Contract;
  get contract() {
    return this._contract;
  }
  constructor(
    address: string,
    abi: ContractInterface,
    provider: ethers.providers.Provider,
    signer?: ethers.Signer,
  ) {
    this.provider = provider;
    this.signer = signer;
    this._contract = new Contract(address, abi, provider);
  }

  async contractWithSigner() {
    if (!this.signer) throw Error('signer not found');
    const factoryContractWithSigner = this._contract.connect(this.signer);
    return factoryContractWithSigner;
  }

  async read(method: string, parameters: Parameters = []) {
    const result = await this._contract[method].apply(null, parameters);
    return result;
  }

  async write(
    method: string,
    parameters: Parameters,
    options?: WriteOption,
  ): Promise<TransactionResponse> {
    const contractWithSigner = await this.contractWithSigner();
    let _gasLimit;

    if (!options?.gasLimit) {
      try {
        const gasEstimate = await contractWithSigner.estimateGas[method].apply(null, parameters);
        // plus 30%
        _gasLimit = gasEstimate.mul(BigNumber.from(100 + 30)).div(BigNumber.from(100));
      } catch (error) {
        _gasLimit = BigNumber.from(DEFAULT_LIMIT);
      }
    } else {
      _gasLimit = BigNumber.from(options.gasLimit);
    }

    const feeOption = Object.assign(options ?? {}, { gasLimit: _gasLimit });
    parameters.push(feeOption);

    const tx: TransactionResponse = await contractWithSigner[method].apply(null, parameters);
    // wail transaction
    // const transactionReceipt = await tx.wait(1);
    return tx;
  }
}

export { BaseContract };

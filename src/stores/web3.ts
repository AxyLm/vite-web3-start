import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { defineStore } from 'pinia';
import { netWorkInfo, provider, NetWorkConfig } from '~/web3';

interface WalletInfo {
  address: string;
  balance: number | string | null;
}

interface Web3State {
  walletInfo: Partial<WalletInfo>;
  network: Partial<NetWorkConfig>;
  ethereumInstalled: boolean;
}

export const useWeb3Store = defineStore('web3', {
  state: (): Web3State => {
    return {
      walletInfo: {
        address: undefined,
        balance: undefined,
      },
      network: {
        name: undefined,
        chain: undefined,
        symbol: undefined,
      },
      ethereumInstalled: false,
    };
  },
  getters: {
    isConnect(): boolean {
      return !!this.walletInfo?.address;
    },
    address(state) {
      return state.walletInfo.address;
    },
    networkName({ network: { name } }) {
      return name;
    },
    chainId({ network: { chain } }) {
      if (typeof chain !== 'number') return Number(chain);
      return chain;
    },
    balance(state) {
      return state.walletInfo.balance;
    },
  },
  actions: {
    connectWallet(
      address: string,
      _network?: (Partial<NetWorkConfig> & { chain: number }) | number,
    ) {
      this.ethereumInstalled = true;

      let chain: number | undefined;
      if (typeof _network === 'number' || !_network) {
        chain = _network;
      } else {
        chain = _network.chain;
      }
      this.walletInfo.address = address;
      if (address) {
        this.updateBalance(address);
      }

      if (chain) {
        this.chainChange(chain);
      }
      // const { address, chainId } = option;
      // !!address && (this.walletInfo.address = address);
      // !!chainId && (this.walletInfo.chainId = chainId);
    },
    async chainChange(chain?: number) {
      const network = netWorkInfo.find((e) => e.chain == chain);
      if (network) {
        this.network = network;
      } else {
        await provider.ready;
        this.network = {
          name: provider._network?.name ?? '',
          chain: provider._network.chainId,
          symbol: ' ',
        };
      }
    },
    async updateBalance(address: string) {
      this.walletInfo.balance = null;
      const balance_big = await provider.getBalance(address);
      const balance = Number(ethers.utils.formatUnits(balance_big));
      this.walletInfo.balance = Math.floor(balance * 1e6) / 1e6;
    },
  },
});

export default '';

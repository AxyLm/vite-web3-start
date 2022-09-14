import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { defineStore } from 'pinia';
import { netWorkInfo, NetWorkConfig, getProvider } from '~/web3';

interface WalletInfo {
  address: string;
  balance: number | string | null;
}

interface Web3State {
  walletInfo: Partial<WalletInfo>;
  network: Partial<NetWorkConfig>;
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
        scan: undefined,
      },
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
    setConnectInfo(address?: string, chain?: string | number) {
      this.walletInfo.address = address;
      if (typeof address === 'string') {
        this.updateBalance(address);
      } else {
        this.walletInfo.balance = undefined;
      }
      if (chain) {
        this.setChain(chain);
      } else {
        getProvider()
          ?.getNetwork()
          .then((res) => {
            this.setChain(res.chainId);
          });
      }
    },
    async setChain(chain: number | string) {
      chain = Number(chain);
      const network = netWorkInfo.find((e) => e.chain === chain);
      if (network) {
        this.network = network;
      } else {
        const network = await getProvider().getNetwork();
        this.network = {
          name: network.name ?? '',
          chain: network.chainId,
          symbol: ' ',
        };
      }
    },
    async updateBalance(address: string) {
      this.walletInfo.balance = null;
      const balance_big = await getProvider()
        .getBalance(address)
        .catch((e) => {
          console.warn(e);
          return 0;
        });
      const balance = Number(ethers.utils.formatUnits(balance_big));
      this.walletInfo.balance = Math.floor(balance * 1e6) / 1e6;
    },
    async connectByProvider(provider: Web3Provider = getProvider()) {
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      this.walletInfo.address = address;
      this.updateBalance(address);
      const { chainId } = await provider.getNetwork();
      this.setChain(chainId);
    },
  },
});

export default '';

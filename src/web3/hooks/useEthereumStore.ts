import { ethers } from 'ethers';
import { defineStore } from 'pinia';
import { getProvider } from './useProvider';
import { ethAccounts } from '~/web3/hooks/ethereum-metods';
import ethereumEmitter from '~/web3/utils/ethereum-event';

interface Network {
  name?: string;
  chainId?: number;
  ensAddress?: string;
}
interface EthereumStore {
  balance: string | undefined | null;

  account: string | undefined;
  ensDomain?: string;

  network: Network;
  networkVersion?: string;
}

export const useEthereumStore = defineStore('ethereum', {
  state: (): EthereumStore => {
    return {
      account: undefined,
      ensDomain: undefined,
      balance: undefined,
      network: {},
    };
  },
  getters: {
    chainId({ network }) {
      return network.chainId;
    },
    accountConnected({ network, account }): false | string {
      if (!account || !network.chainId) return false;
      return `${account}-${network.chainId}`;
    },
  },
  actions: {
    connect({ account, network }: { account?: string; network?: Network }) {
      console.log('removeAndListener', { account, network });
      this.account = account;
      this.network = network ?? {};
      if (this.accountConnected) {
        this.updateBalance();
      }
    },
    reset() {
      this.account = undefined;
      this.network = {};
      this.balance = undefined;
    },
    async updateBalance() {
      if (!this.account) return false;
      this.balance = null;
      await getProvider()!
        .getBalance(this.account)
        .then((balance) => {
          this.balance = ethers.utils.formatUnits(balance);
        })
        .catch((e) => {
          this.balance = '0';
        });
    },
  },
});

export async function connectEthereum() {
  const [account] = await ethAccounts();
  const ethereumStore = useEthereumStore();
  if (account) {
    const provider = getProvider();
    const { chainId, name, ensAddress } = await provider!.getNetwork();
    ethereumStore.connect({
      account,
      network: { chainId, name, ensAddress },
    });
  } else {
    ethereumStore.reset();
  }
}

function proxyEthereumEvent() {
  window.ethereum.removeListener('chainChanged', handChainChanged);
  window.ethereum.removeListener('accountsChanged', handAccountsChanged);

  window.ethereum.on('chainChanged', handChainChanged);
  window.ethereum.on('accountsChanged', handAccountsChanged);
}
function handChainChanged(e: number) {
  ethereumEmitter.emit('ethereum_chainChanged', e);
  connectEthereum();
}
function handAccountsChanged(e: string[]) {
  ethereumEmitter.emit('ethereum_accountChanged', e);
  connectEthereum();
}

if (window.ethereum) {
  proxyEthereumEvent();
} else {
  // installed
}

export default useEthereumStore;

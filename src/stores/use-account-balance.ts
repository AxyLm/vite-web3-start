import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useEthereumStore } from '~/stores/ethereum.store';
import { ERC20 } from '~/contracts/erc20';
import { getProvider } from '~/composables/use-provider';
import { ethers } from 'ethers';
import { Token } from '~/constants/token';
import { useAccountConnected } from '~/composables/account-changed';

export enum IncloudToken {
  USDC = 'USDC',
  BTC = 'BTC',
}

const tokens = {
  [IncloudToken.USDC]: {
    symbol: IncloudToken.USDC,
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    decimals: 18,
  },
  [IncloudToken.BTC]: {
    symbol: IncloudToken.BTC,
    address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    decimals: 18,
  },
};

interface TokenBalance extends Token {
  balance?: string;
}

export const useAccountBalance = defineStore('AccountBalance', () => {
  const { ethereumState } = useEthereumStore();

  useAccountConnected({
    reset: () => reset(),
    update: () =>
      Promise.all(Object.values(accountBalance.value).map(async (e) => updateBalance(e))),
  });

  const accountBalance = ref<Record<IncloudToken, TokenBalance>>(tokens);

  function reset() {
    Object.values(accountBalance.value).map(async (e) => {
      e.balance = undefined;
    });
  }

  const updateBalance = async (token: TokenBalance) => {
    if (!ethereumState.account.value) return;
    const srcContract = ERC20.init(token.address, getProvider());
    srcContract
      .getBalanceOf(ethereumState.account.value)
      .then((e) => {
        token.balance = ethers.utils.formatUnits(e, token.decimals);
      })
      .catch((e) => {
        console.log(e);
        token.balance = undefined;
      });
  };
  return {
    accountBalance,
    updateBalance,
  };
});

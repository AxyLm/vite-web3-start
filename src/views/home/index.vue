<template>
  <div class="max-w-lg px-4">
    <div
      class="m-h-20 mb-4 w-full rounded-xl bg-base-10 p-4 pt-4 text-base-2 dark:bg-base-11 dark:text-base-2 sm:p-6"
    >
      <div class="text-md font-semibold">
        <span>Token {{ $t('balance') }}</span>
        <!-- <span class="ml-10 text-skin-500 dark:text-skin-400">0</span> -->
      </div>

      <div class="mt-2 mb-4">
        <!-- TODO: support query input address  -->
        <input
          v-model="walletAddress"
          autofocus
          placeholder="0x00..00"
          type="text"
          readonly
          class="mt-1 h-14 w-full rounded-lg border border-base-8 bg-base-9 p-4 text-skin-400 ring-0 ring-base-7 ring-offset-0 transition-colors focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-base-7 focus-visible:ring-offset-0 dark:bg-base-13"
        />
      </div>

      <div class="">
        <div
          v-for="item of TokenList"
          :key="item.address"
          class="mt-1 rounded-md border border-base-8 dark:bg-base-12"
        >
          <div class="flex px-4">
            <div class="w-4/12 flex-col border border-transparent border-r-base-8 py-2">
              <div class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-6">{{
                item.name
              }}</div>
              <div class="mt-1">
                <!-- <icon-usdc class="mr-2"/> -->
                <span>{{ item.symbol }}</span>
              </div>
            </div>
            <div class="w-8/12 flex-col py-2 pl-2 text-right">
              <div class="text-xs text-base-6">{{ $t('balance') }}</div>
              <div class="mt-1 cursor-text overflow-hidden text-ellipsis whitespace-nowrap">
                <!-- <component :is="transferConfig.to.networkIcon"></component> -->
                <span v-if="item.balance === undefined" class="text-md ml-2">
                  <icon-eos-icons:three-dots-loading />
                </span>
                <span v-else-if="item.balance === null" :class="['text-md ml-2']">-</span>
                <span v-else :class="['text-md ml-2', item.balance > 0 && 'text-skin-500']">{{
                  item.balance
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { isAddress } from '@ethersproject/address';
  import { JsonRpcProvider } from '@ethersproject/providers';
  import { BigNumber, Contract, ethers } from 'ethers';
  import { computed, nextTick, ref, watch } from 'vue';
  import { useWeb3Store } from '~/stores/web3';
  import { getProvider } from '~/web3';
  import { createERC20 } from '~/web3/contracts/erc20';

  interface Token {
    name?: string;
    symbol?: string;
    decimals?: number;
    address: string;
    balance?: number | string | undefined | null;
    contract?: Contract;
  }

  export default {
    setup() {
      const store = useWeb3Store();

      const walletAddress = ref();

      const defaultTokenList: (Token | string)[] = [
        {
          address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
          symbol: 'BTCB',
          name: 'BTCB Token',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          symbol: 'ETH',
          name: 'Ethereum Token',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          symbol: 'WBNB',
          name: 'Wrapped BNB',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          symbol: 'USDC',
          name: 'USD Coin',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          symbol: 'BUSD',
          name: 'BUSD Token',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
          symbol: 'DOGE',
          name: 'Dogecoin',
          decimals: 8,
          balance: undefined,
        },
        {
          address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
          symbol: 'DAI',
          name: 'Dai Token',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0x3d6545b08693dae087e957cb1180ee38b9e3c25e',
          symbol: 'ETC',
          name: 'Ethereum Classic',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
          symbol: 'Cake',
          name: 'PancakeSwap Token',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
          symbol: 'SHIB',
          name: 'SHIBA INU',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0x1ce0c2827e2ef14d5c4f29a091d735a204794041',
          symbol: 'AVAX',
          name: 'Avalanche',
          decimals: 18,
          balance: undefined,
        },
        {
          address: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
          symbol: 'UNI',
          name: 'Uniswap',
          decimals: 18,
          balance: undefined,
        },
      ];

      const TokenList = ref<Token[]>([]);

      const getTokenInfo = async () => {
        const provider = getProvider() ?? new JsonRpcProvider('https://bsc-dataseed.binance.org');
        if (walletAddress.value && isAddress(walletAddress.value)) {
          TokenList.value = defaultTokenList.map((e) => {
            if (typeof e === 'string') return { address: e, symbol: undefined };
            return e;
          });

          const address = walletAddress.value;
          TokenList.value.forEach(async (e) => {
            const token = e;
            const erc20 = createERC20(token.address, provider);

            if (!token.symbol) token.symbol = await erc20.getSymbol();
            if (!token.name) token.name = await erc20.getName();
            if (!token.decimals) token.decimals = await erc20.getDecimals();

            const balance_big = await Promise.race([
              erc20.getBalanceOf(address).catch((e) => {
                token.balance = null;
                return null;
              }),
              new Promise((resolve) =>
                setTimeout(() => {
                  console.log('timeout');
                  resolve(null);
                }, 1000 * 5),
              ),
            ]);
            if (balance_big != null) {
              token.balance = ethers.utils.formatUnits(balance_big as BigNumber, token.decimals);
            } else {
              token.balance = null;
            }
          });
        }
      };

      if (store.walletInfo.address) {
        walletAddress.value = store.walletInfo.address;
        getTokenInfo();
      } else {
        store.$subscribe((mutations, state) => {
          console.log(mutations, state);
          walletAddress.value = store.walletInfo.address;
          getTokenInfo();
        });
      }
      // watch(
      //   address,
      //   (value) => {
      //     if (value && isAddress(value)) {
      //       TokenList.value = defaultTokenList.map((e) => {
      //         if (typeof e === 'string') return { address: e };
      //         return e;
      //       });
      //       getTokenInfo(value);
      //     }
      //   },
      //   {
      //     // immediate: true,
      //   },
      // );

      return {
        walletAddress,
        TokenList,
      };
    },
  };
</script>

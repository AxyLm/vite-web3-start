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
  import { BigNumber, ethers } from 'ethers';
  import { defineComponent, ref, watch } from 'vue';
  import { useWeb3Store } from '~/stores/web3';
  import { getProvider, eth_ERC20, bsc_ERC20, TokenInfo } from '~/web3';
  import { createERC20 } from '~/web3/contracts/erc20';

  export default defineComponent({
    setup() {
      const store = useWeb3Store();

      const walletAddress = ref();

      const TokenList = ref<TokenInfo[]>([]);

      const getTokenInfo = async () => {
        const defaultTokenList: (TokenInfo | string)[] =
          store.chainId === 56 ? bsc_ERC20 : eth_ERC20;
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
      watch(store.$state, ({ walletInfo }) => {
        if (walletInfo.address) {
          walletAddress.value = walletInfo.address;
          getTokenInfo();
        }
      });
      return {
        walletAddress,
        TokenList,
      };
    },
  });
</script>

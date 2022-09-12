<template>
  <div class="max-w-lg px-4">
    <div class="m-h-20 mb-4 w-full rounded-xl bg-base-11 p-4 pt-4 sm:p-6">
      <div class="text-md font-semibold">
        <span>{{ $t(`${$route.meta.barTitle}.bar_title`) }}</span>
        <!-- <span class="ml-10 text-skin-500 dark:text-skin-400">0</span> -->
      </div>

      <div class="mt-4">
        <h2 class="text-sm text-base-6">{{ $t('form') }}</h2>
        <div class="mt-1 rounded-md border border-base-8 dark:bg-base-13">
          <div class="flex px-2">
            <div class="w-8/12 flex-col border border-transparent border-r-base-8 py-2">
              <div class="text-xs text-base-6">{{ $t('token') }}</div>
              <div class="mt-1 cursor-pointer">
                <icon-usdc />
                <span class="ml-2">{{ transferConfig.from.token }}</span>
              </div>
            </div>
            <div class="w-4/12 flex-col py-2 pl-2">
              <div class="text-xs text-base-6">{{ $t('network') }}</div>
              <div class="mt-1 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
                <component :is="transferConfig.from.networkIcon"></component>
                <span class="text-md ml-1">{{ transferConfig.from.network }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 mb-2 text-center text-2xl"> <icon-tabler:arrows-transfer-down /> </div>

      <div class="">
        <h2 class="text-sm text-base-6">{{ $t('to') }}</h2>
        <div class="mt-1 rounded-md border border-base-8 dark:bg-base-13">
          <div class="flex px-2">
            <div class="w-8/12 flex-col border border-transparent border-r-base-8 py-2">
              <div class="text-xs text-base-6">{{ $t('token') }}</div>
              <div class="mt-1 cursor-pointer">
                <icon-usdc />
                <span class="ml-2">{{ transferConfig.to.token }}</span>
              </div>
            </div>
            <div class="w-4/12 flex-col py-2 pl-2">
              <div class="text-xs text-base-6">{{ $t('network') }}</div>
              <div class="mt-1 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
                <component :is="transferConfig.to.networkIcon"></component>
                <span class="text-md ml-1">{{ transferConfig.to.network }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <div class="flex items-end text-base-6">
          <h2 class="w-8/12 text-sm">{{ $t('transfer.total_amount') }}</h2>
          <p class="w-4/12 text-right text-xs"
            >{{ $t('balance') }}: <span>0.0 {{ transferToken }}</span>
          </p>
        </div>
        <input
          v-model.number="amount"
          placeholder="0.0"
          type="text"
          class="mt-1 h-14 w-full rounded-lg border border-base-8 bg-skin-200 p-4 text-xl ring-0 ring-base-7 ring-offset-0 transition-colors focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-base-7 focus-visible:ring-offset-0 dark:bg-base-13"
        />
      </div>

      <div class="mt-4 flex h-10 rounded-md p-2 leading-6 text-base-5 dark:bg-base-12">
        <p class="w-8/12 text-sm">{{ $t('transfer.will_receive') }}</p>
        <p class="w-4/12 text-right">{{
          amount && amount > 0 ? `${amount} ${transferToken}` : '-'
        }}</p>
      </div>
      <div class="">
        <button
          alt="Coming soon"
          :disabled="!isConnect"
          class="mt-10 h-10 w-full rounded-xl bg-skin-300 text-center text-lg leading-10 disabled:hover:cursor-not-allowed dark:bg-skin-600 hover:dark:bg-skin-700 active:dark:bg-skin-800"
        >
          <span v-if="isConnect">
            {{ $t('transfer.confirm_btn') }}
            <span class="text-sm">({{ $t('coming_soon') }})</span>
          </span>
          <span v-else> Please connect first <icon-material-symbols:turn-slight-right /> </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent, ref, watch } from 'vue';
  import { useWeb3Store } from '~/stores/web3';
  import IconUsdc from '~icons/coins/usdc';
  import IconNetworkEth from '~icons/networks/ethereum';
  import IconBnb from '~icons/networks/bnb';

  export default defineComponent({
    name: 'Transfer',
    computed: {
      ...mapState(useWeb3Store, ['isConnect']),
    },
    components: {
      IconUsdc,
      IconNetworkEth,
      IconBnb,
    },
    setup() {
      const amount = ref<number | undefined>(undefined);
      watch(amount, (count) => {
        if (count && count > 1000) amount.value = 1000;
      });

      const transferToken = 'USDC';

      const transferConfig = {
        from: {
          token: 'USDC',
          chain: 56,
          network: 'BNB',
          networkIcon: IconBnb,
        },
        to: {
          token: 'USDC',
          chain: 1,
          network: 'ETH',
          networkIcon: IconNetworkEth,
        },
      };
      return {
        amount,
        transferToken,
        transferConfig,
      };
    },
  });
</script>

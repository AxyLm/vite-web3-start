<template>
  <template v-if="accountConnected">
    <button
      v-if="accountConnected"
      class="hidden h-9 items-center rounded-md border bg-transparent px-4 text-sm leading-9 dark:border-white/20 dark:hover:bg-opacity-60 sm:flex"
    >
      <IconBnb v-if="network?.chainId == '0x38'" class="mr-2 inline" />
      <span class="">{{ network?.chainName }}</span>
      <!-- <NumberLoading :value="balance" :dp="2">
        <template #default="{ formatValue }">
          {{ network?.nativeCurrency.symbol }} {{ formatValue }}
        </template>
      </NumberLoading> -->
    </button>
  </template>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EthereumStore } from '~/stores/ethereum.store';
  import { mapState } from 'pinia';
  import IconBnb from '~icons/coin/bnb-chain';
  export default defineComponent({
    name: 'Network',
    components: {
      IconBnb,
    },
    setup() {
      // && network?.chainId == '0x38'"
      return {};
    },
    computed: {
      ...mapState(EthereumStore, ['accountConnected', 'account', 'balance', 'network']),
    },
  });
</script>

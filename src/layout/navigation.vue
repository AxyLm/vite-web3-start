<template>
  <header class="header flex h-22 items-center justify-between px-4 sm:h-22 md:px-10">
    <div class="bar-title flex items-center">
      <div class="mr-4 inline-block"> </div>
    </div>

    <div class="flex">
      <Network />
      <template v-if="accountConnected">
        <div
          class="btn-primary no-animation btn-sm btn flex h-9 items-center rounded-full px-4 text-white"
        >
          <span>{{ account }}</span>
        </div>
      </template>
      <Connector v-else />
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Network from './components/network/index.vue';
  import Connector from './components/connect/index.vue';
  import useEthereumStore from '~/web3/hooks/useEthereumStore';
  import { mapState } from 'pinia';

  export default defineComponent({
    name: 'Navigation',
    components: {
      Network,
      Connector,
    },
    setup() {
      return {};
    },
    computed: {
      ...mapState(useEthereumStore, ['accountConnected', 'account']),
    },
  });
</script>
<style lang="less" scoped>
  .active {
    color: rgb(39, 162, 126);
  }
  .head-page-link {
    &:hover {
      .active();
    }
  }
</style>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { AppSetting } from '~/stores/app-setting.store';
  import { useEthereumStore } from '~/stores/ethereum.store';
  import { useBalance } from '~/stores/hooks/use-balance';
  import { useConnectedNetwork } from '~/stores/hooks/use-network';
  import { useAccountBalance } from '~/stores/use-account-balance';
  export default defineComponent({
    name: 'App',
    setup() {
      // AppSetting();
      // useConnectedNetwork();
      // useEthereumStore();
      // useBalance();
      // useAccountBalance();
    },
  });
</script>
<style lang="less">
  @import url('./style/index.less');
  @import url('./style/theme/dark.less');
</style>

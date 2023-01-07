<template>
  <Web3ProviderContext>
    <router-view class="h-screen w-screen"></router-view>
  </Web3ProviderContext>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Web3ProviderContext from '~/context/web3-provider/index.vue';
  export default defineComponent({
    name: 'App',
    components: {
      Web3ProviderContext,
    },
  });
</script>

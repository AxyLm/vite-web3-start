<template>
  <div class="layout max-h-screen overflow-y-auto overflow-x-hidden">
    <div class="layout-wrap h-full" :style="{}">
      <navigation />
      <router-view v-slot="{ Component }" class="pb-22 container mx-auto mt-8 px-4 md:pb-14">
        <component :is="Component" :key="accountConnected" />
      </router-view>
    </div>
  </div>
</template>
<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent } from 'vue';
  import useEthereumStore from '~/web3/hooks/useEthereumStore';
  import navigation from './navigation.vue';
  export default defineComponent({
    name: 'Layout',
    components: {
      navigation,
    },
    setup(props, ctx) {
      return {};
    },
    computed: {
      ...mapState(useEthereumStore, ['accountConnected']),
    },
  });
</script>
<style lang="less" scoped>
  .layout {
    position: relative;

    .layout-wrap {
      width: 100%;
      // overflow: hidden visible;
      .container {
        max-width: 1312px;
        position: relative;
        z-index: 2;
        margin: 24px auto;
      }
    }
  }
</style>

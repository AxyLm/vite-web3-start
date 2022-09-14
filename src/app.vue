<template>
  <!-- <router-view></router-view> -->
  <Layout />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Layout from '~/layout/index.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Layout,
    },
  });
</script>
<style lang="less">
  body,
  main#root {
    @apply w-screen  transition-colors dark:bg-base-dark dark:text-base-2;
  }
  main#root {
    font-family: Josefin Sans, sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @apply font-normal;
  }

  .dark {
    color-scheme: dark;
    main#root {
      background-image: url(~/assets/svg/bg-stars.svg);
    }
  }
</style>

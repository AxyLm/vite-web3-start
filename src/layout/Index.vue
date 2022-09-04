<template>
  <div class="layout">
    <LayoutHeader />
    <div class="p-20 text-center">
      <img src="/src/assets/logo.svg" class="mb-20 inline w-60" alt="" />
      <div>
        <router-view></router-view>
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>
<script lang="ts">
  import LayoutHeader from './header.vue';
  import LayoutFooter from './footer.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Layout',
    components: {
      LayoutHeader,
      LayoutFooter,
    },
  });
</script>

<style lang="less">
  .wrap {
    height: 100vh;
  }

  .fm1 {
    font-family: 'Josefin Sans', sans-serif;
  }

  .fm2 {
    font-family: sans-serif;
  }
</style>

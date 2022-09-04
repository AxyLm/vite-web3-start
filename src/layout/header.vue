<template>
  <header class="header sticky top-0 flex h-20 items-center justify-between px-10">
    <div></div>
    <div>
      <button class="nav-btn" @click="themeAni">
        <icon-carbon-sun v-if="!isDark" class="h-6 w-6" />
        <icon-carbon-moon v-else class="h-6 w-6" />
      </button>
      <button class="nav-btn ml-2 text-center" @click="toggleLocale()">
        <icon-carbon-language class="h-6 w-6" />
      </button>
      <a href="http://soulfree.cn" target="_blank" class="ml-2 text-center">
        <button class="nav-btn">
          <icon-mdi:blogger class="h-6 w-6" />
        </button>
      </a>
      <a href="https://github.com/AxyLm/vite-taicu" target="_blank" class="ml-2 text-center">
        <button class="nav-btn">
          <icon-carbon:logo-github class="h-6 w-6" />
        </button>
      </a>
    </div>
  </header>
</template>
<script setup lang="ts">
  import { isDark } from '~/composables';
  // import { useI18n } from "vue-i18n";
  import { useI18n, useThemeChang } from '~/composables';
  const { t, toggleLocale } = useI18n();

  const { themeAni } = useThemeChang(isDark);
</script>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'LayoutHeader',
  });
</script>
<style lang="less" scoped>
  .header {
    backdrop-filter: saturate(250%) blur(20px);
    box-shadow: 0px 0px 25px 5px rgb(10 10 10 / 12%);
    // @apply bg-base-1 dark:bg-base-13 bg-opacity-70 dark:bg-opacity-75 transition-colors delay-200;
  }

  .nav-btn {
    @apply w-8 text-center;
  }
</style>

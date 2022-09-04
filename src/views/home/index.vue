<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useAppStore } from '~/stores/app';
  const { countPlus, count } = useAppStore();
  const { t } = useI18n();
</script>

<template>
  <div>
    <div>
      <span class="fm1 text-5xl">{{ t('helloWorld') }}</span>
    </div>
    <p class="mt-5">
      <button class="btn w-32" @click="countPlus()">
        plus {{ $pinia.state.value.app.count }}
      </button>
    </p>
  </div>
</template>

<style lang="less" scoped>
  .wrap {
    height: 100vh;
  }

  .fm1 {
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 300;
  }

  .fm2 {
    font-family: sans-serif;
  }

  .btn {
    @apply text-base-1 shadow-lg transition-colors;
    @apply h-8 rounded-md px-2 font-normal;
    @apply bg-skin-500 outline-skin-700  dark:bg-skin-600 dark:outline-skin-700;

    @apply ring-skin-600 ring-offset-1 hover:ring-2 dark:ring-skin-500 dark:active:ring-skin-500;
    @apply ring-offset-base-light  active:bg-skin-400   dark:ring-offset-base-dark;
    @apply dark:ring-offset-skin-900 dark:active:bg-skin-700;

    @apply disabled:active:bg-skin-300  dark:disabled:active:bg-skin-600;
  }
</style>

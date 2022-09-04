<template>
  <div class="font-normal">
    <span class="text-3xl">About</span>

    <p class="text-2xl">一个 Vue 开发模版</p>
    <!-- <p class=""> Vite + Vue3、Pinia、TypeScript、Eslint、Prettier、LintStaged、Tailwindcss </p> -->
    <ul class="m-auto mt-4 inline-block w-auto list-disc text-left text-xl">
      <li
        >⚡️ <a target="_blank" href="https://github.com/vuejs/vue-next">Vue 3</a>,
        <a target="_blank" href="https://github.com/vitejs/vite">Vite</a>,
        <a target="_blank" href="https://www.typescriptlang.org/zh/" rel="nofollow">TypeScript</a>
        Yes!</li
      >
      <li
        >🍍
        <a target="_blank" href="https://pinia.esm.dev/" rel="nofollow"
          >使用 Pinia 的状态管理</a
        ></li
      >
      <li
        >😃
        <a target="_blank" href="https://github.com/antfu/unocss/tree/main/packages/preset-icons"
          >Iconify
        </a>
        - 各种图标集为你所用，浏览：<a
          target="_blank"
          href="https://icones.netlify.app/"
          rel="nofollow"
          >🔍 Icones</a
        ></li
      >
      <li
        >🌍
        <a target="_blank" href="/AxyLm/vite-taicu/blob/main/locales">I18n 国际化开箱即用</a></li
      >
      <li
        >🎨 <a target="_blank" href="https://www.tailwindcss.cn/" rel="nofollow">Tailwindcss</a> -
        原子化 CSS</li
      >
      <!-- <li
        >📦 <a target="_blank" href="https://pinia.esm.dev" rel="nofollow">Pinia</a> - 轻便灵活的
        Vue 状态管理</li
      > -->
      <li
        >🛠 <a target="_blank" href="https://github.com/antfu/vueuse">VueUse</a> - Vue CompositionApi
        的集合</li
      >
      <li
        ><a target="_blank" href="http://eslint.cn/" rel="nofollow">Eslint</a> +
        <a target="_blank" href="https://prettier.io/" rel="nofollow">Prettier</a> +
        <a target="_blank" href="https://typicode.github.io/husky/" rel="nofollow">Husky</a>
        自动格式化...</li
      >
    </ul>

    <p class="mt-4 text-lg"
      >跳过项目之始的配置环节，快速实现想法。 <code> new FastifyIdea(); </code>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'About',
  });
</script>

<style lang="less" scoped>
  ul a {
    @apply text-skin-700;
  }
</style>

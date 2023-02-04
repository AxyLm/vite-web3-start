import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import * as path from 'path';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')],
    },
  },
  resolve: {
    alias: {
      '~views/': `${path.resolve(__dirname, './src/views')}/`,
      '~/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      ignored: ['./config/*', './locales/*'],
    },
  },
  esbuild: {
    pure: ['console.log'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV != 'production',
    manifest: true,
    chunkSizeWarningLimit: 533,
    rollupOptions: {
      output: {
        manualChunks: {
          es: ['ethers'],
          vue: ['vue', 'vue-router'],
          // ui: ['@headlessui/vue', 'tailwindcss', 'daisyui'],
          // store: [
          //   'pinia',
          //   'src/stores/app-setting.store.ts',
          //   'src/stores/ethereum.store.ts',
          //   'src/stores/use-account-balance.ts',
          // ],
        },
      },
    },
  },
  plugins: [
    vue(),
    // VueI18n({
    //   include: [path.resolve(__dirname, 'locales/**')],
    // }),
    Icons({
      scale: 1.2,
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        logo: FileSystemIconLoader('./src/assets/logo', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
        coin: FileSystemIconLoader('./src/assets/coins', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
      iconCustomizer(collection, icon, props) {
        // customize this icon in this collection
        if (['logo', 'coin'].includes(collection)) {
          props.class = 'icon inline ';
        }
      },
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
      dts: 'src/components.d.ts',
      dirs: ['src/views/components/'],
    }),
  ],
});

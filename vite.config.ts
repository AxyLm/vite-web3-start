import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import * as path from 'path';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { VarletUIResolver } from 'unplugin-vue-components/resolvers';
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
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    manifest: true,
    chunkSizeWarningLimit: 533,
  },
  plugins: [
    vue(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    Icons({
      scale: 1,
      defaultStyle: '', // Style apply to icons
      defaultClass: 'icon inline', // Class names apply to icons
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        coins: FileSystemIconLoader('./src/assets/coins', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
        networks: FileSystemIconLoader('./src/assets/networks', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
      iconCustomizer(collection, icon, props) {
        // customize this icon in this collection
        if (['coins', 'networks'].includes(collection)) {
          props.class = 'icon h-6 w-6 inline align-text-bottom';
        }
      },
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
        VarletUIResolver(),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
});

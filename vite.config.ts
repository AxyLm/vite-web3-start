import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_VERSION__: new Date().getTime(),
  },
  server: {
    host: '0.0.0.0',
    port: 6173,
  },
  esbuild: {
    pure: ['console.log', 'console.debug'],
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['react-dom'],
  },
  plugins: [
    react(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      autoInstall: true,

    }),
    AutoImport({
      imports: ['react'],
      dts: './src/auto-imports.d.ts',
      resolvers: [
        IconsResolver({
          prefix: 'i',
          componentPrefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),
  ],
})

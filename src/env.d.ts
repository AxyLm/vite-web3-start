/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_DEV: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_SSO_KEY: string;
  readonly VITE_APP_CORE_URL: string;
  readonly VITE_APP_SSO_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly V_DEV: string;
  readonly V_TITLE: string;
  readonly V_ENV: string;
  readonly V_SSO_KEY: string;
  readonly V_BASE_URL: string;
  readonly V_SSO_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  ethereum: any;
}

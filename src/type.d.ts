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
  readonly V_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  ethereum: MetaMaskProvider;
}

/**
 * MetaMask
 * Docs: https://docs.metamask.io/guide/ethereum-provider.html
 * JSON RPC API: https://metamask.github.io/api-playground/api-documentation
 */
interface MetaMaskProvider extends MetaMaskEthereumProvider {
  isMetaMask: boolean;
  providers?: MetaMaskProvider[];
  isConnected: () => boolean;
  request: (request: { method: string; params?: any[] | undefined }) => Promise<any>;
  selectedAddress: string;
}

/**
 * source: @metamask/detect-provider
 * https://github.com/MetaMask/detect-provider/blob/main/src/index.ts
 */
interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

declare module 'vue3-popper' {
  import type { Component } from 'vue';
  export default Component;
}

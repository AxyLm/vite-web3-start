import { Connector } from './connector';
import { getAddress, hexValue } from 'ethers/lib/utils';
import {
  ProviderNotFoundError,
  ProviderRpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
} from './errors';
import UniversalProvider from '@walletconnect/universal-provider';
import QRCodeModal from '@walletconnect/qrcode-modal';

/**
 * WalletConnect v1.0 \
 * Docs: https://docs.walletconnect.com/quick-start/dapps/web3-provider \
 * Test Wallet: https://test.walletconnect.org/ \
 * Source: https://github.com/WalletConnect/walletconnect-monorepo/blob/v1.0/packages/providers/web3-provider/src/index.ts
 */
export interface IWalletConnectProvider extends UniversalProvider {} // eslint-disable-line

export type WalletConnectOptions = ConstructorParameters<typeof UniversalProvider>[0];
const PROJECT_ID = 'bd2399e0c5e4cc2a448515e65fc9b887';

const namespance = {
  eip155: {
    methods: [
      'eth_accounts',
      'eth_sendTransaction',
      'eth_signTransaction',
      'eth_sign',
      'personal_sign',
      'eth_signTypedData',
      '_signTypedData',
      'eth_signTypedData_v4',
    ],
    chains: ['eip155:56'],
    events: ['chainChanged', 'accountsChanged'],
    rpcMap: {
      56: `https://rpc.walletconnect.com?chainId=eip155:56&projectId=${PROJECT_ID}`,
    },
  },
};

export class WalletConnectConnector extends Connector<UniversalProvider, WalletConnectOptions> {
  readonly name = 'walletConnect';

  #provider?: UniversalProvider;
  #onDisconnectHandler?: (code: number, reason: string) => void;
  #onAccountsChangedHandler?: (accounts: string[]) => void;
  #onChainChangedHandler?: (chainId: number) => void;

  constructor(options: WalletConnectOptions) {
    super(options);
  }

  async connect() {
    const provider = await this.getProvider();
    // await provider.disconnect();
    this.#provider = provider;

    provider.once('display_uri', (e: string) => {
      QRCodeModal.open(e, () => {
        console.log('EVENT', 'QR Code Modal closed');
      });
    });

    console.log(provider);

    await provider.connect({
      namespaces: namespance,
    });

    const accounts = await provider.enable();
    if (accounts.length == 0) return Promise.reject('account not found');
    const account = getAddress(accounts[0]);
    console.log(account);
    QRCodeModal.close();
    return {
      account,
      provider,
    };
  }

  async getProvider() {
    const UniversalProvider = (await import('@walletconnect/universal-provider')).default;
    const provider = await UniversalProvider.init({
      logger: 'warn',
      relayUrl: 'wss://relay.walletconnect.com',
      projectId: PROJECT_ID,
      metadata: {
        name: 'Quickswap',
        description: 'Quickswap of dappos',
        url: window.location.href,
        icons: ['/favicon.png'],
      },
    });
    return provider;
  }

  async disconnect() {
    if (!this.#provider) throw new ProviderNotFoundError();
    await this.#provider.disconnect();
    this.#provider = undefined;
  }

  onDisconnect(handler: (code: number, reason: string) => void) {
    if (!this.#provider) throw new ProviderNotFoundError();
    if (this.#onDisconnectHandler) {
      this.#removeListener('session_delete', this.#onDisconnectHandler);
    }
    this.#onDisconnectHandler = handler;
    this.#provider.on('session_delete', handler);
  }

  onAccountsChanged(handler: (accounts: string[]) => void) {
    if (!this.#provider) throw new ProviderNotFoundError();
    if (this.#onAccountsChangedHandler) {
      this.#removeListener('accountsChanged', this.#onAccountsChangedHandler);
    }
    this.#onAccountsChangedHandler = handler;
    this.#provider.on('accountsChanged', handler);
  }

  onChainChanged(handler: (chainId: number) => void) {
    if (!this.#provider) throw new ProviderNotFoundError();
    if (this.#onChainChangedHandler) {
      this.#removeListener('chainChanged', this.#onChainChangedHandler);
    }
    this.#onChainChangedHandler = handler;
    this.#provider.on('chainChanged', (chainId: number) => {
      handler(chainId);
    });
  }

  #removeListener(event: string, handler: (...args: any[]) => void) {
    if (!this.#provider) throw new ProviderNotFoundError();
    this.#provider.removeListener(event, handler);
    // console.log('remove listener', event, handler)
  }
}

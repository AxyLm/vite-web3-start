// Source: wagmi https://github.com/tmm/wagmi/blob/main/packages/core/src/errors.ts

/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
export class RpcError<T = undefined> extends Error {
  readonly code: number;
  readonly data?: T;
  readonly internal?: unknown;

  constructor(
    /** Number error code */
    code: number,
    /** Human-readable string */
    message: string,
    /** Low-level error */
    internal?: unknown,
    /** Other useful information about error */
    data?: T,
  ) {
    if (!Number.isInteger(code)) throw new Error('"code" must be an integer.');
    if (!message || typeof message !== 'string')
      throw new Error('"message" must be a nonempty string.');

    super(message);
    this.code = code;
    this.data = data;
    this.internal = internal;
  }
}

/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
export class ProviderRpcError<T = undefined> extends RpcError<T> {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  constructor(
    /**
     * Number error code
     * @see https://eips.ethereum.org/EIPS/eip-1193#error-standards
     */
    code: 4001 | 4100 | 4200 | 4900 | 4901 | 4902,
    /** Human-readable string */
    message: string,
    /** Low-level error */
    internal?: unknown,
    /** Other useful information about error */
    data?: T,
  ) {
    if (!(Number.isInteger(code) && code >= 1000 && code <= 4999))
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');

    super(code, message, internal, data);
  }
}

export class ConnectorNotFoundError extends Error {
  name = 'ConnectorNotFoundError';
  message = 'Connector not found';
}

export class ProviderNotFoundError extends Error {
  name = 'ProviderNotFoundError';
  message = 'Provider not found';
}

export class AddChainError extends Error {
  name = 'AddChainError';
  message = 'Error adding chain';
}

export class SwitchChainError extends ProviderRpcError {
  name = 'SwitchChainError';

  constructor(error: any) {
    super(4902, error.message);
  }
}

export class SwitchChainNotSupportedError extends Error {
  name = 'SwitchChainNotSupportedError';
  message = 'Switch chain not supported by connector';
}

export class UserRejectedRequestError extends ProviderRpcError {
  name = 'UserRejectedRequestError';

  constructor(error: any) {
    super(4001, error.message);
  }
}

export class ActivateEthersError extends Error {
  name = 'ActivateEthersError';
  message = 'Failed to load wallet data';
  constructor(msg: string) {
    super();
    if (msg) {
      this.message = this.message + ': ' + msg;
    }
  }
}

export class ConnectError extends Error {
  name = 'ConnectError';
  constructor(msg: string) {
    super(msg);
  }
}

export class AutoConnectError extends Error {
  name = 'AutoConnectError';
  constructor(msg: string) {
    super(msg);
  }
}

// Refer to https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
export interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name?: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

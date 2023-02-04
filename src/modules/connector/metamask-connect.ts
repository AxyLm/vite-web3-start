import { ethers } from 'ethers';
import { storeToRefs } from 'pinia';
import { getProvider, useProvider } from '~/composables/use-provider';
import { EvmChainParameter, getEvmChainParameter } from '~/constants';
import { ChainIds } from '~/constants/enums/chain-id';
import { ethereum } from '~/modules/connector/metamask';
import { EthereumStore, useEthereumStore } from '~/stores/ethereum.store';
import { useConnectedNetwork } from '~/stores/hooks/use-network';

if (ethereum) {
  const { provider, setProvider } = useProvider();
  const _provider = new ethers.providers.Web3Provider(ethereum);
  setProvider(_provider);

  ethereum.removeListener('chainChanged', handChainChanged);
  ethereum.removeListener('accountsChanged', handAccountsChanged);

  ethereum.on('chainChanged', handChainChanged);
  ethereum.on('accountsChanged', handAccountsChanged);
}

function handChainChanged(e: number) {
  const { provider, setProvider } = useProvider();
  const _provider = new ethers.providers.Web3Provider(ethereum!);
  setProvider(_provider);

  // connectEthereum();
  const networkStore = useConnectedNetwork();
  networkStore.updateNetwork();
}
function handAccountsChanged(e: string[]) {
  const { ethereumStore, ethereumState } = useEthereumStore();
  if (e[0]) {
    ethereumState.account.value = e[0];
  } else {
    ethereumStore.reset();
  }
}

export async function isConnected(): Promise<boolean> {
  if (!ethereum) return false;
  const [currentAccount] = await ethereum.request({ method: 'eth_accounts' });
  return !!currentAccount;
}

export async function connectAccount(): Promise<void> {
  const { provider, setProvider } = useProvider();

  const [account] = await provider.value!.send('eth_requestAccounts', []).catch((e) => {
    console.log('[MetaMask] ', e?.message);
    return [];
  });
  if (account) {
    connectEthereum();
  }
}

export function ethAccounts(): Promise<string[] | []> {
  return ethereum!.request({ method: 'eth_accounts' });
}

export async function connectEthereum() {
  const [account] = await ethAccounts();
  const { ethereumStore, ethereumState } = useEthereumStore();
  const networkStore = useConnectedNetwork();
  if (account) {
    const provider = getProvider();
    const { chainId } = await provider.getNetwork();
    ethereumState.account.value = account;
    networkStore.setNetwork(chainId);
  } else {
    ethereumStore.reset();
  }
}

export async function switchChain(chainId: ChainIds) {
  // TODO:
  const evmParameter = getEvmChainParameter(chainId);

  const provider = getProvider();
  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: evmParameter.chainId }]);
  } catch (err: any) {
    if (err.code === 4902) {
      try {
        const evmParameter = getEvmChainParameter(chainId);

        await addChain(evmParameter);
      } catch (err: unknown) {
        // if (this.#isUserRejectedRequestError(err)) {
        //   throw new UserRejectedRequestError(err);
        // }
        // throw new AddChainError();
      }
    }
    // if (this.#isUserRejectedRequestError(err)) {
    //   throw new UserRejectedRequestError(err);
    // }
    // throw new SwitchChainError(err);
  }
}

export async function addChain(networkDetails: EvmChainParameter) {
  const provider = getProvider();

  try {
    await provider.send('wallet_addEthereumChain', [networkDetails]);
  } catch (err: unknown) {
    throw Error('wallet_addEthereumChain \n');
  }
}

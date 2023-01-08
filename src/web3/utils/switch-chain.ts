import { hexValue } from 'ethers/lib/utils';
import { getProvider } from '~/hooks/useProvider';
import { AddEthereumChainParameter, ProviderRpcError } from '~/web3/type';

export async function switchChain(chainId: number) {
  const provider = getProvider();
  if (!provider) return;
  const id = hexValue(chainId);

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: id }],
    });
  } catch (err: unknown) {
    if ((<ProviderRpcError>err).code === 4902) {
      try {
        // await addChain(
        //   _availableNetworks[chainId as keyof typeof NETWORK_DETAILS] as AddEthereumChainParameter,
        // );
      } catch (err: unknown) {
        return err;
      }
    }
  }
}

export async function addChain(networkDetails: AddEthereumChainParameter) {
  const provider = getProvider();
  if (!provider) return;

  try {
    provider.request({
      method: 'wallet_addEthereumChain',
      params: [networkDetails], // notice that chainId must be in hexadecimal numbers
    });
  } catch (err: unknown) {
    return err;
  }
}

export default null;

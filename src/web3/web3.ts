import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { ref } from 'vue';

export function useWeb3() {
  const provider = ref<Web3Provider>();

  const signer = ref<JsonRpcSigner>();

  return {
    setProvider(_provider: Web3Provider) {
      // const { connectWallet } = useWeb3Store();
      provider.value = _provider;
      signer.value = _provider.getSigner();
    },
    provider,
    signer,
  };
}

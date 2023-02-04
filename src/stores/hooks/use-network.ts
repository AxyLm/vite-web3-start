import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';
import { useProvider } from '~/composables/use-provider';
import { EvmChainParameter, getEvmChainParameter } from '~/constants';
import { ChainIds } from '~/constants/enums/chain-id';

export const useConnectedNetwork = defineStore('useConnectedNetwork', () => {
  const { provider } = useProvider();

  const network = ref<EvmChainParameter>();
  const setNetwork = (chainId: string | number | ChainIds) => {
    const evmParameter = getEvmChainParameter(chainId);
    network.value = evmParameter ?? getEvmChainParameter(ChainIds.ETHEREUM);
  };

  const updateNetwork = () => {
    if (!provider.value) return false;
    return provider.value.getNetwork().then(({ chainId }) => {
      setNetwork(chainId);
    });
  };

  return { network, updateNetwork, setNetwork };
});

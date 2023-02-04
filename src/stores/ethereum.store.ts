import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import { useBalance } from '~/stores/hooks/use-balance';
import { useConnectedNetwork } from '~/stores/hooks/use-network';


export const EthereumStore = defineStore('EthereumStore', () => {
  const account = ref<string>();

  const connectNetwork = useConnectedNetwork();
  const { network } = storeToRefs(connectNetwork);

  const balanceStore = useBalance();
  const { balance } = storeToRefs(balanceStore);


  const reset = () => {
    account.value = undefined;
    balance.value = undefined;
    connectNetwork.network = undefined;
  };

  const accountConnected = computed(() => {
    if (account.value && network.value?.chainId) {
      return `${account.value}-${Number(network.value?.chainId)}`;
    }
    return false;
  });

  return {
    accountConnected,
    network,
    account,
    balance,
    reset,
  };
});

export const useEthereumStore = () => {
  const ethereumStore = EthereumStore();
  const ethereumState = storeToRefs(ethereumStore);

  return {
    ethereumStore,
    ethereumState,
  };
};

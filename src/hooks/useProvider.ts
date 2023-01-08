import { ethers } from 'ethers';
import { computed, shallowRef } from 'vue';

type Provider = ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;

const _provider = shallowRef<Provider>();

const provider = computed(() => {
  return _provider.value;
});

const setProvider = (p: Provider) => {
  _provider.value = p;
};

const getProvider = () => {
  return _provider.value;
};

const getSinger = () => {
  if (!provider.value) throw Error('provider no found');
  return provider.value.getSigner();
};

export { getProvider, getSinger, setProvider };

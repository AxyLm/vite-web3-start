<template>
  <div
    class="connect-item bg-skin-200 hover:bg-skin-200 no-animation btn flex h-14 w-full cursor-pointer items-center justify-start rounded-md py-4 px-6"
    @click="connectMetaMask()"
  >
    <!-- <div class="h-6 w-6"> <img src="../../assets/svg/metamask.png" alt="" srcset="" /> </div> -->
    <div class="ml-2">Metamask</div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent, ref, shallowRef, computed, defineEmits } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';
  import { connectAccount, setProvider } from '~/web3/hooks/useProvider';
  import { getNetwork } from '~/web3/configs';
  import { ethers } from 'ethers';

  export default defineComponent({
    name: 'ConnectorMetamask',
    emits: {
      accountConnected(account: string) {
        return !!account;
      },
    },
    setup(props, { emit }) {
      const accountPopoerShow = ref(false);
      const popper = shallowRef(null);

      const store = useEthereumStore();
      const connectLoading = ref(false);
      const connectMetaMask = async () => {
        if (store.accountConnected) return false;
        if (window.ethereum) {
          connectLoading.value = true;
          setProvider(new ethers.providers.Web3Provider(window.ethereum));
          connectAccount()
            .then((res) => {
              emit('accountConnected', store.account!);
            })
            .finally(() => {
              connectLoading.value = false;
            });
        }
      };

      const addressFilter = (adr?: string) => {
        if (!adr || adr.length < 10) return;
        adr = adr.toLocaleUpperCase();
        return `${adr.substring(0, 4)}...${adr.substring(adr.length - 4, adr.length)}`;
      };

      const network = computed(() => {
        return getNetwork(store.chainId!);
      });

      return {
        connectMetaMask,
        addressFilter,
        connectLoading,
        accountPopoerShow,
        popper,
        network,
      };
    },
    computed: {
      ...mapState(useEthereumStore, ['account', 'chainId', 'balance', 'accountConnected']),
    },
  });
</script>

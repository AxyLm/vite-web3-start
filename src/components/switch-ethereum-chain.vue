<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent, defineProps, PropType, ref, computed, reactive } from 'vue';
  import { useEthereumStore } from '~/web3/hooks/useEthereumStore';
  import { connectAccount } from '~/web3/hooks/web3Provider';
  import ethereumEmitter from '~/web3/utils/ethereum-event';
  export default defineComponent({
    name: 'SwitchEthereumChain',
    computed: {
      ...mapState(useEthereumStore, ['account', 'chainId', 'balance', 'accountConnected']),
    },
  });
</script>
<script lang="ts" setup>
  const props = defineProps({
    supportChains: {
      type: Array as PropType<number[]>,
      required: false,
      default: () => {
        return [56];
      },
    },
    connectText: {
      type: String,
      default: () => {
        return 'Connect Wallet';
      },
    },
    switchText: {
      type: String,
      default: () => {
        return 'Switch Network';
      },
    },
  });

  const { supportChains, connectText, switchText } = reactive(props);

  const store = useEthereumStore();

  const connectLoading = ref(false);

  const isNeedConnect = computed(() => {
    return !store.accountConnected || !store.chainId;
  });

  const isNeedSwitchChain = computed(() => {
    if (!store.chainId) return false;
    return !supportChains.includes(store.chainId);
  });

  const text = computed(() => {
    if (isNeedConnect.value) return connectText;
    if (isNeedSwitchChain.value) return switchText;
    return '';
  });

  const isError = computed(() => {
    return [isNeedConnect.value, isNeedSwitchChain.value].some((e) => e === true);
  });

  const handClick = async (chainId: number) => {
    if (window.ethereum) {
      connectLoading.value = true;

      if (isNeedConnect.value) {
        connectAccount().finally(() => {
          connectLoading.value = false;
        });
      }

      if (isNeedSwitchChain.value) {
        ethereumEmitter.on('ethereum_chainChanged', () => {
          connectLoading.value = false;
        });
        window.ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          })
          .finally(() => {
            setTimeout(() => {
              connectLoading.value = false;
            }, 5000);
          });
      }
    }
  };
</script>

<template>
  <button
    v-if="isError"
    :class="['btn', { loading: connectLoading }, $attrs.class]"
    @click="handClick(supportChains[0])"
  >
    <span> {{ text }} </span>
  </button>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script lang="ts">
  import { mapState, storeToRefs } from 'pinia';
  import { defineComponent, defineProps, PropType, ref, computed, reactive } from 'vue';
  import { ChainIds } from '~/constants/enums/chain-id';
  import { MetaMaskStore, switchChain } from '~/modules/connector';
  import { EthereumStore } from '~/stores/ethereum.store';
  export default defineComponent({
    name: 'SwitchEthereumChain',
    inheritAttrs: false,
    computed: {
      ...mapState(EthereumStore, ['account', 'chainId', 'balance', 'accountConnected']),
    },
  });
</script>
<script lang="ts" setup>
  const props = defineProps({
    supportChains: {
      type: Array as PropType<ChainIds[]>,
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

  const store = EthereumStore();
  const { account, network } = storeToRefs(store);

  const connectLoading = ref(false);

  const isNeedConnect = computed(() => {
    return !account.value || !network.value;
  });

  const isNeedSwitchChain = computed(() => {
    if (!network.value) return false;
    return !supportChains.includes(Number(network.value.chainId));
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
    connectLoading.value = true;

    if (isNeedConnect.value) {
      MetaMaskStore()
        .requestConnect()
        .finally(() => {
          connectLoading.value = false;
        });
    }

    if (isNeedSwitchChain.value) {
      switchChain(chainId).finally(() => {
        connectLoading.value = false;
      });
    }
  };
</script>

<template>
  <button
    v-if="isError"
    :class="[{ loading: connectLoading }, $attrs.class]"
    v-bind="$attrs"
    @click="handClick(supportChains[0])"
  >
    <span> {{ text }} </span>
  </button>
  <template v-else>
    <slot></slot>
  </template>
</template>

import { ethers } from 'ethers';
import { onMounted, ref, watch } from 'vue';
import { useEthereumStore } from '~/stores/ethereum.store';

/**
 * useAccountChanged
 * @description watch account
 * @callback  reset
 * @callback  update
 */
export const useAccountChanged = (option: {
  reset?: () => void;
  update?: () => Promise<unknown>;
}) => {
  const { ethereumState } = useEthereumStore();
  const { reset, update } = option;
  const loading = ref(false);

  watch(
    ethereumState.account,
    (n, o) => {
      loading.value = true;
      if (!n) {
        reset && reset();
        loading.value = true;
      } else if (ethers.utils.isAddress(n)) {
        if (n.toLowerCase() != o?.toLowerCase()) {
          if (update) {
            update().finally(() => {
              loading.value = false;
            });
          }
        }
      } else {
        reset && reset();
        loading.value = true;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    loading,
  };
};

/**
 * useAccountConnected
 * @description watch account & network
 * @callback  reset
 * @callback  update
 */
export const useAccountConnected = (option: {
  reset?: () => void;
  update?: () => Promise<unknown>;
}) => {
  const { ethereumState } = useEthereumStore();

  const loading = ref(!!ethereumState.account.value);

  const { reset, update } = option;
  watch(ethereumState.account, (n, o) => {
    loading.value = true;
    if (!n) {
      reset && reset();
      loading.value = false;
    } else if (ethers.utils.isAddress(n)) {
      if (n.toLowerCase() != o?.toLowerCase()) {
        if (update) {
          update().finally(() => {
            loading.value = false;
          });
        }
      }
    } else {
      reset && reset();
      loading.value = true;
    }
  });

  watch(
    ethereumState.network,
    (n, o) => {
      if (n) {
        if (n.chainId != o?.chainId) {
          if (update) {
            update().finally(() => {
              loading.value = false;
            });
          } else {
            loading.value = false;
          }
        }
      } else {
        reset && reset();
        loading.value = false;
      }
    },
    {
      immediate: false,
    },
  );

  onMounted(() => {
    if (update) {
      update().finally(() => {
        loading.value = false;
      });
    }
  });

  return {
    loading,
  };
};

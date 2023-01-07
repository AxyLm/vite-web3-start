<template>
  <template v-if="accountConnected">
    <button
      v-if="network?.chain === 56"
      class="no-animation btn-sm btn mr-3 hidden h-9 items-center rounded-full border-0 text-sm capitalize text-dark-4 dark:bg-dark-2 sm:flex"
    >
      <template v-if="network?.chain === 56">
        <component
          :is="networkIconKey ? networkIcons[networkIconKey] : MaterialSymbolsBlock"
        ></component>
        <span class="ml-2">{{ network?.name }}</span>
      </template>
    </button>

    <Popper v-else :show="switchPopoerShow">
      <button
        class="btn-accent no-animation btn-sm btn mr-3 hidden h-9 rounded-full border-0 text-md capitalize dark:bg-red-500 sm:block"
        @click="handSwitchPopoerShow()"
      >
        <span class="hidden text-sm text-base-1 sm:inline">Wrong Network</span>
      </button>
      <template #content>
        <ul
          ref="popper"
          tabindex="0"
          class="w-58 dropdown-content menu rounded-box bg-dark-2 p-2 shadow active:bg-dark-2"
        >
          <li
            v-for="item in networks"
            :key="item.name"
            class="focus-visible:bg-dark-2 active:bg-dark-2"
            :class="{ loading: item.loading }"
            @click="network?.chain != item.chain && onNetworkChange(item)"
          >
            <a
              :class="{
                active: network?.chain == item.chain,
              }"
            >
              <icon-eos-icons:loading v-show="item.loading" class="h-6 w-6" />
              <component :is="item.icon" v-show="!item.loading"></component>
              <span class="base-content">
                {{ item.name }}
              </span>
            </a>
          </li>
        </ul>
      </template>
    </Popper>
  </template>
</template>

<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent, FunctionalComponent, ref, reactive, shallowRef, markRaw } from 'vue';

  import IconBnb from '~icons/networks/bnb';
  import IconEth from '~icons/networks/ethereum';

  import MaterialSymbolsBlock from '~icons/material-symbols/block';
  import { getNetwork, Network, Networks } from '~/web3/configs';
  import Popper from 'vue3-popper';
  import { onClickOutside } from '@vueuse/core';
  import web3Emitter from '~/web3/utils/ethereum-event';
  import { useToggle } from '@vueuse/core';
  import useEthereumStore from '~/web3/hooks/useEthereumStore';

  const networkIcons: {
    [key in number]: FunctionalComponent;
  } = {
    1: IconEth,
    56: IconBnb,
  };

  interface NetworkItem extends Network {
    loading: boolean;
    icon: FunctionalComponent;
  }

  export default defineComponent({
    name: 'NetworkPopoer',
    components: {
      Popper,
      IconBnb: markRaw(IconBnb),
      IconEth: markRaw(IconEth),
    },
    setup() {
      const popper = shallowRef(null);
      const switchPopoerShow = ref(false);
      const networks = reactive(
        Networks.filter((e) => [56].includes(e.chain)).map((e) => ({
          ...e,
          icon: networkIcons[e.chain],
          loading: false,
        })),
      );

      const onNetworkChange = async (item: NetworkItem) => {
        item.loading = true;
        // item.icon = IconLoading;

        // TODO add chain
        // window.ethereum.request({
        //   method: 'wallet_addEthereumChain',
        //   params: [params],
        // });
        window.ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            // chainId must be in hexadecimal numbers
            params: [{ chainId: `0x${item.chain.toString(16)}` }],
          })
          .catch((e: any) => {
            item.loading = false;
          });

        web3Emitter.on('ethereum_chainChanged', () => {
          switchPopoerShow.value = false;
          item.loading = false;
        });
      };
      onClickOutside(popper, () => {
        switchPopoerShow.value = false;
      });

      const handSwitchPopoerShow = useToggle(switchPopoerShow);
      return {
        popper,
        networkIcons,
        MaterialSymbolsBlock,
        switchPopoerShow,
        onNetworkChange,
        networks,
        handSwitchPopoerShow,
      };
    },
    computed: {
      ...mapState(useEthereumStore, ['accountConnected', 'chainId']),
      networkIconKey() {
        const { chainId } = useEthereumStore();
        if (chainId && networkIcons[chainId]) {
          return chainId;
        }
        return undefined;
      },
      network() {
        const { chainId } = useEthereumStore();
        if (!chainId) return undefined;
        return getNetwork(chainId!);
      },
    },
  });
</script>

<template>
  <div class="layout max-h-screen overflow-y-auto overflow-x-hidden">
    <div class="layout-wrap h-full" :style="{}">
      <div v-if="accountConnected">
        <input v-model="inpu" type="text " />
        <button class="btn" @click="handClick()">handClick</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { mapState } from 'pinia';
  import { defineComponent, ref, watchSyncEffect } from 'vue';
  import useEthereumStore from '~/web3/hooks/useEthereumStore';
  import { getSinger } from '~/web3/hooks/useProvider';
  export default defineComponent({
    name: 'Layout',
    components: {},
    setup(props, ctx) {
      const handClick = () => {
        const singer = getSinger();

        singer
          ._signTypedData(
            {
              name: 'VirtualWallet',
              version: '1',
              chainId: 56,
              verifyingContract: '0x5Df62ea22d32B36461e8d98Cf803c434346b20d0',
            },
            {
              approve: [
                { name: 'service', type: 'address' },
                { name: 'code', type: 'uint' },
                { name: 'data', type: 'address' },
              ],
            },
            {
              service: '0x5Df62ea22d32B36461e8d98Cf803c434346b20d0',
              code: '1153616820367707549345717916247602122976091570196',
              data: '0x5Df62ea22d32B36461e8d98Cf803c434346b20d0',
            },
          )
          .then((e) => {
            console.log('e', e);
          });
        // getSinger().signMessage(`${inpu.value}`);
        console.log(singer._signTypedData);
      };

      const inpu = ref('123');
      return { handClick, inpu };
    },
    computed: {
      ...mapState(useEthereumStore, ['accountConnected', 'account']),
    },
  });
</script>
<style lang="less" scoped>
  .layout {
    position: relative;

    .layout-wrap {
      width: 100%;
      // overflow: hidden visible;
      .container {
        max-width: 1312px;
        position: relative;
        z-index: 2;
        margin: 24px auto;
      }
    }
  }
</style>

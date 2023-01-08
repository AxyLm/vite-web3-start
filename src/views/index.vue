<template>
  <div class="layout max-h-screen overflow-y-auto overflow-x-hidden pt-2">
    <div class="layout-wrap h-full" :style="{}">
      <div v-if="accountConnected">
        <input v-model="signMsg" type="text " class="input mr-2 outline-none" />
        <button class="btn-md btn" @click="handClick()">Sign Message</button>

        <input type="textare" :value="sign" class="h-19 w-full" readonly />
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
      const sign = ref('');
      const handClick = () => {
        const singer = getSinger();

        singer.signMessage(signMsg.value).then((e) => {
          sign.value = e;
          console.log('e', e);
        });
        // getSinger().signMessage(`${inpu.value}`);
        console.log(singer._signTypedData);
      };

      const signMsg = ref('signMessage');
      return { handClick, signMsg, sign };
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

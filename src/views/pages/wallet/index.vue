<template>
  <div class="pt-30 wallet">
    <div class="grid grid-cols-1 gap-4 rounded-lg p-4 text-base-2 dark:bg-base-11 dark:text-base-2">
      <p class="text-xl">
        <span>Generation wallet</span> <br class="block sm:hidden">
        <span class="text-sm text-white/60">(I promise not to save your private key)</span></p
      >
      <div>
        <button class="btn-primary btn-sm btn" @click="geberatuibWallet()">Start</button>
      </div>

      <div v-show="wallet" class="grid w-full grid-cols-1 gap-2">
        <div>
          <div class="text-md">Address</div>
          <div class="break-all indent-2 text-sm text-white/70"> {{ wallet?.address }} </div>
          <div v-if="qrcode_address?.value" class="w-full">
            <img :src="qrcode_address.value" alt="" srcset="" class="h-20 w-20" />
          </div>
        </div>

        <div>
          <div class="text-md">Mnemonic</div>
          <div class="break-words indent-2 text-sm text-white/70">
            <div>{{ wallet?.mnemonic.locale }}</div>
            <div>{{ wallet?.mnemonic.path }}</div>
            <div>{{ wallet?.mnemonic.phrase }}</div>
          </div>

          <div v-if="qrcode_phrase?.value" class="w-full">
            <img :src="qrcode_phrase.value" alt="" srcset="" class="h-20 w-20" />
          </div>
        </div>

        <div>
          <div class="text-md">Private Key</div>
          <div class="break-all indent-2 text-sm text-white/70"> {{ wallet?.privateKey }} </div>
          <div v-if="qrcode_privateKey?.value" class="w-full">
            <img :src="qrcode_privateKey.value" alt="" srcset="" class="h-20 w-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Wallet, ethers } from 'ethers';
  import { computed, defineComponent, ref, shallowRef } from 'vue';
  import { useDebounceFn } from '@vueuse/core';

  import { useQRCode } from '@vueuse/integrations/useQRCode';

  export default defineComponent({
    setup() {
      const wallet = shallowRef<Wallet>();
      const qrcode_address = computed(() => {
        if (!wallet.value) return undefined;
        return useQRCode(wallet.value.address);
      });

      const qrcode_privateKey = computed(() => {
        if (!wallet.value) return undefined;
        return useQRCode(wallet.value.privateKey);
      });

      const qrcode_phrase = computed(() => {
        if (!wallet.value) return undefined;
        return useQRCode(wallet.value.mnemonic.phrase);
      });
      const geberatuibWallet = useDebounceFn(() => {
        new Promise(() => {
          wallet.value = ethers.Wallet.createRandom({});
        });
      }, 20);
      return {
        qrcode_address,
        qrcode_privateKey,
        qrcode_phrase,
        wallet,
        geberatuibWallet,
      };
    },
  });
</script>

<style scoped lang="less">
  .wallet {
    @apply w-full lg:max-w-2xl;
  }

  .btn {
    @apply transition-colors focus:outline-0;
    @apply h-8  px-2 font-normal dark:ring-offset-1;
    // @apply bg-skin-300 outline-skin-700  dark:bg-skin-600 dark:outline-skin-700;
    // @apply ring-skin-200 active:bg-skin-300 dark:ring-skin-500 ring-offset-base-light  hover:ring-2 dark:ring-offset-base-dark;
    // @apply dark:ring-offset-skin-900 dark:active:bg-skin-700 dark:active:ring-skin-500;

    // @apply disabled:active:bg-skin-300  dark:disabled:active:bg-skin-600;
  }
</style>

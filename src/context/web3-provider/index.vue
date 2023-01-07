<script lang="ts">
  import { defineComponent } from 'vue';
  import ConnectModal from '~/layout/components/connect/index.vue';
  export default defineComponent({
    name: 'ConnectorContext',
    components: {
      ConnectModal,
    },
  });
</script>
<template>
  <slot></slot>
  <teleport to="body">
    <ConnectModal />
  </teleport>
</template>

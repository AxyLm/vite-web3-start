<script lang="ts">
  import { defineComponent } from 'vue';
  import ConnectorModal from '~/components/connector-modal/index.vue';
  export default defineComponent({
    name: 'ConnectorContext',
    components: { ConnectorModal },
  });
</script>
<template>
  <slot></slot>

  <ConnectorModal />
</template>

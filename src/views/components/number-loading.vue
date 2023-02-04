<template>
  <span>
    <template v-if="isEmptyOrLoad">
      <span v-if="isEmpty" class="is-empty">
        <slot name="empty">{{ empty }}</slot>
      </span>
      <span v-else-if="isLoading" class="is-load">
        <slot name="load">
          <icon-eos-icons:three-dots-loading />
        </slot>
      </span>
    </template>
    <template v-else>
      <slot
        :format-value="formatValue"
        :raw-value="_value"
        :value="BigNumberValue"
        :fixed-value="fixedValue"
      >
        {{ formatValue }}
      </slot>
    </template>
  </span>
</template>
<script lang="ts" setup>
  import { defineProps, PropType, defineComponent, toRefs, computed, toRef } from 'vue';
  import Bignumber from 'bignumber.js';

  defineComponent({
    name: 'NumberLoading',
  });

  const props = defineProps({
    value: {
      type: String as PropType<number | string | undefined | null>,
      required: true,
    },
    empty: {
      type: String,
      default: () => {
        return '-';
      },
    },
    load: {
      type: Boolean as PropType<boolean | string | null>,
      default: () => {
        return null;
      },
    },
    dp: {
      type: Number as PropType<number>,
      default: () => {
        return -1;
      },
    },

    rm: {
      type: Number as PropType<Bignumber.RoundingMode>,
      default: () => {
        return 1;
      },
    },
  });
  const { empty, load, dp, rm } = toRefs(props);

  const _value = toRef(props, 'value');

  const isEmpty = computed(() => {
    return _value.value === undefined;
  });
  const isLoading = computed(() => {
    if (load.value != null) {
      return !!load.value;
    }
    return _value.value === null;
  });

  const isEmptyOrLoad = computed(() => {
    return isEmpty.value || isLoading.value;
  });

  const formatValue = computed(() => {
    if (!_value?.value) {
      return '';
    }
    if (dp.value === -1) return _value.value;
    return new Bignumber(_value.value).toFormat(dp.value, rm.value);
  });
  const BigNumberValue = computed(() => {
    return new Bignumber(_value.value ?? 0);
  });

  const fixedValue = computed(() => {
    if (!_value?.value) {
      return '';
    }
    if (dp.value === -1) return _value.value;
    return new Bignumber(_value.value).toFixed(dp.value, rm.value);
  });
</script>

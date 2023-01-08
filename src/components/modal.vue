<script lang="ts">
  import { defineComponent, watch, ref } from 'vue';

  export default defineComponent({
    props: {
      dark: {
        type: Boolean,
        required: false,
        default: false,
      },
      modalOpen: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const closeModal = () => {
        emit('close');
      };

      // prevent page scrolling when the modal is open
      watch(
        () => props.modalOpen,
        (value) => {
          if (value) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        },
      );

      return {
        closeModal,
      };
    },
  });
</script>

<template>
  <teleport to="body">
    <transition name="modal-animation">
      <div
        class="modal bg-black/75 dark:bg-base-13/50"
        :class="{ 'modal-open': modalOpen }"
        style="backdrop-filter: blur(9.9px)"
        @click.self="closeModal"
      >
        <div ref="modal" class="rounded-6 dark:bg-skin-100 modal-box max-w-3xl p-6">
          <div class="mb-8 flex w-full justify-between text-xl">
            <span class="">Connect Wallet</span>
            <div class="text-2xs cursor-pointer" @click="closeModal">X</div>
          </div>

          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

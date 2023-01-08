import { ref } from 'vue';

export type ConnectionStatus = 'none' | 'connecting' | 'loading' | 'connected';
const boardOpen = ref(false);
const status = ref<ConnectionStatus>('none');

export function useBoard() {
  const open = () => {
    boardOpen.value = true;
  };
  const close = () => {
    boardOpen.value = false;
  };

  return {
    status,
    boardOpen,
    open,
    close,
  };
}

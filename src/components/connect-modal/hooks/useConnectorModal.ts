import { defineStore } from 'pinia';
import { FunctionalComponent, Component } from 'vue';
export type ConnectionStatus = 'none' | 'connecting' | 'loading' | 'connected';

export const useConnectModal = defineStore(
  'connectorModal', // () => { }

  {
    state: (): {
      modalActived: boolean;
      status: ConnectionStatus;
    } => {
      return {
        modalActived: false,
        status: 'none',
      };
    },

    actions: {
      updateStatus(e: ConnectionStatus) {
        this.status = e;
      },
      open() {
        this.modalActived = true;
      },
      close() {
        this.modalActived = false;
      },
      toggle() {
        this.modalActived = !this.modalActived;
      },
    },
  },
);

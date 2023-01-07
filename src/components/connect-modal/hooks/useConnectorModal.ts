import { defineStore } from 'pinia';
import { FunctionalComponent, Component } from 'vue';

export const useConnectModal = defineStore(
  'connectorModal', // () => { }

  {
    state: (): {
      modalActived: boolean;
      activedComponent?: Component;
    } => {
      return {
        modalActived: false,
        activedComponent: undefined,
      };
    },

    actions: {
      resetRoute() {
        this.activedComponent = undefined;
      },
      open() {
        this.resetRoute();
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

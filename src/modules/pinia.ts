import { createPinia } from 'pinia';
import { type App } from 'vue';

export const install = (app: App<Element>) => {
  const pinia = createPinia();

  app.use(pinia);
};

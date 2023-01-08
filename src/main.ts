import 'tailwindcss/tailwind.css';
import './style/index.less';

import { createApp } from 'vue';

// import { MemoryRouter } from 'vue-router-lite';

const app = createApp(App);

import App from './app.vue';
import { routerInstance } from './router';
app.use(routerInstance);
// app.component(MemoryRouter);

import { install as PiniaInstall } from './modules/pinia';
PiniaInstall(app);

app.mount('#root');

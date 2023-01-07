import 'tailwindcss/tailwind.css';
import './style/index.less';

import { createApp } from 'vue';
const app = createApp(App);

import App from './app.vue';
import { routerInstance } from './router';
app.use(routerInstance);


import { install as PiniaInstall } from './modules/pinia';
PiniaInstall(app);

app.mount('#root');

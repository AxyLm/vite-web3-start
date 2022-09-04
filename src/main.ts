import 'tailwindcss/tailwind.css';
import { createApp } from 'vue';
import App from './app.vue';
import { router } from './route';
import './style/index.less';

const app = createApp(App);

Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) => i.install?.(app));

app.use(router);

app.mount('#app');

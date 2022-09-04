import { router } from './route';
import { createApp } from 'vue';
import App from './app.vue';
import './style/index.less';
import 'tailwindcss/tailwind.css';

const app = createApp(App);

Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) => i.install?.(app));

app.use(router);

app.mount('#root');

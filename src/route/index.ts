import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '~/views/home/index.vue';
import Layout from '../layout/index.vue';
const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      {
        name: 'Home',
        path: 'home',
        component: Home,
      },
      {
        name: 'About',
        path: 'about',
        component: () => import('~/views/about/index.vue'),
      },
    ],
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  next();
});

export { router };

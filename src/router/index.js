import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import(`@/views/demo/index.vue`),
  },
  {
    path: '/demo/table',
    name: 'demo-table',
    component: () => import(`@/views/demo/table.vue`),
  },
  {
    path: '/demo/form',
    name: 'demo-form',
    component: () => import(`@/views/demo/form.vue`),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

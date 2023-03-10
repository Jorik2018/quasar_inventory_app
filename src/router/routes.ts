import { RouteRecordRaw } from 'vue-router';
import Auth from './middleware';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin/inventory',
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: Auth,
    children: [
      { path: '', redirect: '/admin/inventory' },
      {
        path: 'income',
        component: () => import('pages/income/List.vue'),
      },
      {
        path: 'income/create',
        component: () => import('pages/income/Form.vue'),
      },
      {
        path: 'income/:pid',
        props: true,
        component: () => import('pages/income/Form.vue'),
      },
      {
        path: 'transfer',
        component: () => import('pages/transfer/List.vue'),
      },
      {
        path: 'transfer/create',
        component: () => import('pages/transfer/Form.vue'),
      },
      {
        path: 'transfer/:pid',
        props: true,
        component: () => import('pages/transfer/Form.vue'),
      },
      {
        path: 'inventory',
        component: () => import('pages/inventory/List.vue'),
      },
      {
        path: 'inventory/create',
        component: () => import('pages/inventory/Form.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

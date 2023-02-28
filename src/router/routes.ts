import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/admin/risk',
        component: () => import('pages/risk/List.vue'),
      },
      {
        path: '/admin/risk/create',
        component: () => import('pages/risk/Form.vue'),
      },
      {
        path: '/admin/income',
        component: () => import('pages/income/List.vue'),
      },
      {
        path: '/admin/income/create',
        component: () => import('pages/income/Form.vue'),
      }
      ,
      {
        path: '/admin/transfer',
        component: () => import('pages/transfer/List.vue'),
      },
      {
        path: '/admin/transfer/create',
        component: () => import('pages/transfer/Form.vue'),
      },
      {
        path: '/admin/inventory',
        component: () => import('pages/inventory/List.vue'),
      },
      {
        path: '/admin/inventory/create',
        component: () => import('pages/inventory/Form.vue'),
      }
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

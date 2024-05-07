import { RouteRecordRaw } from 'vue-router';

export const names = {
  Main: 'Main',
  NotFound: 'NotFound',
};

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('../layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: names.Main,
        component: () => import('../views/MainView.vue'),
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: names.NotFound,
    component: () => import('../views/error/NotFoundView.vue'),
  }
];

export default routes;
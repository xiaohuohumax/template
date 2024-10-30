import type { RouteRecordRaw } from 'vue-router'

export enum RouteName {
  Home = 'Home',
  About = 'About',
  NotFound = 'NotFound',
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: RouteName.Home,
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: 'Home',
          keepAlive: true,
          scrollToTop: false,
        },
      },
      {
        path: 'about',
        name: RouteName.About,
        component: () => import('@/view/about/index.vue'),
        meta: {
          title: 'About',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: RouteName.NotFound,
    component: () => import('@/view/error/404/index.vue'),
    meta: {
      title: '404 Not Found',
      keepAlive: false,
    },
  },
]

export default routes

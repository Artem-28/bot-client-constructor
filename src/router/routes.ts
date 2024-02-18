import { RouteRecordRaw } from 'vue-router';
import {MenuItemNameEnum} from 'src/types/enum/menu-item-name.enum';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/projects',
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/auth',
        component: () => import('pages/auth/AuthPage.vue')
      },
    ],
  },

  {
    path: '/projects',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/projects',
        meta: { authorized: true },
        component: () => import('pages/projects/ProjectsGridPage.vue')
      },
    ],
  },

  {
    path: '/projects/:projectId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'scripts',
        meta: {
          parentRoute: MenuItemNameEnum.PROJECTS,
        },
        component: () => import('pages/scripts/ScriptsGridPage.vue')
      },
      {
        path: 'messages',
        meta: {
          parentRoute: MenuItemNameEnum.PROJECTS,
        },
        component: () => import('pages/messages/MessagesPage.vue')
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

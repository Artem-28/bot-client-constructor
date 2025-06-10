import { RouterView } from 'vue-router';
import { checkPermission } from 'boot/check-permission';

const layouts = {
  mainLayout: () => import('layouts/main-layout/main-layout'),
  emptyLayout: () => import('layouts/empty-layout/empty-layout'),
};

const pages = {
  loginPage: () => import('pages/login-page/login-page'),
  signUpPage: () => import('pages/sign-up-page/sign-up-page'),
  forgotPasswordPage: () => import('pages/forgot-password-page/forgot-password-page'),
  resetPasswordPage: () => import('pages/reset-password-page/reset-password-page'),
  projectsPage: () => import('pages/projects-page/projects-page'),
  scriptsPage: () => import('pages/scripts-page/scripts-page'),
  projectSettingsPage: () => import('pages/project-settings-page/project-settings-page'),
  subsPage: () => import('pages/subs-page/subs-page'),
  subPage: () => import('pages/sub-page/sub-page'),
  messagesPage: () => import('pages/messages-page/messages-page'),
  forbiddenPage: () => import('pages/forbidden-page/forbidden-page'),
  constructorPage: () => import('pages/constructor-page/constructor-page'),
};

const routes = [
  {
    path: '/',
    redirect: () => ({ name: 'login' }),
    component: layouts.emptyLayout,
    meta: {
      autoLogin: true,
    },
    children: [
      { path: '/login', name: 'login', component: pages.loginPage },
      { path: '/sign_up', name: 'signUp', component: pages.signUpPage },
      { path: '/forgot_password', name: 'forgotPassword', component: pages.forgotPasswordPage },
      { path: '/reset_password', name: 'resetPassword', component: pages.resetPasswordPage },
    ],
  },
  {
    path: '/',
    component: layouts.mainLayout,
    meta: { authorized: true },
    children: [
      {
        path: '/forbidden',
        component: RouterView,
        children: [
          {
            path: '',
            name: 'forbidden',
            component: pages.forbiddenPage,
            meta: {
              root: true,
            },
          },
        ],
      },
      {
        path: '/projects',
        component: RouterView,
        children: [
          {
            path: '',
            name: 'projects',
            component: pages.projectsPage,
            meta: {
              root: true,
            },
          },
          {
            path: ':project_id',
            component: RouterView,
            children: [
              {
                path: '',
                name: 'project',
                redirect: () => ({ name: 'scripts' }),
              },
              {
                path: 'scripts',
                component: RouterView,
                children: [
                  {
                    path: '',
                    name: 'scripts',
                    component: pages.scriptsPage,
                  },
                  {
                    path: ':script_id',
                    component: RouterView,
                    children: [
                      {
                        path: '',
                        name: 'script',
                        component: pages.constructorPage,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'settings',
                component: RouterView,
                children: [
                  {
                    path: '',
                    name: 'projectSettings',
                    component: pages.projectSettingsPage,
                    meta: {
                      accessRoles: projectId => checkPermission(projectId, ['write_project']),
                    },
                  },
                ],
              },
              {
                path: 'subs',
                component: RouterView,
                children: [
                  {
                    path: '',
                    name: 'subs',
                    component: pages.subsPage,
                  },
                  {
                    path: ':sub_id',
                    component: RouterView,
                    children: [
                      {
                        path: '',
                        name: 'sub',
                        component: pages.subPage,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'messages',
                component: RouterView,
                children: [
                  {
                    path: '',
                    name: 'messages',
                    component: pages.messagesPage,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;

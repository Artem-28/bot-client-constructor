import { RouterView } from 'vue-router';

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
  usersPage: () => import('pages/users-page/users-page'),
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
                    component: pages.scriptsPage(),
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
                    component: pages.projectSettingsPage(),
                  },
                ],
              },
              {
                path: 'users',
                component: RouterView,
                children: [
                  {
                    path: '',
                    name: 'users',
                    component: pages.usersPage(),
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

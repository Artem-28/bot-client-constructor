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
};

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: layouts.emptyLayout,
    meta: {
      autoLogin: true,
    },
    children: [
      { path: '/login', component: pages.loginPage },
      { path: '/sign_up', component: pages.signUpPage },
      { path: '/forgot_password', component: pages.forgotPasswordPage },
      { path: '/reset_password', component: pages.resetPasswordPage },
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
          { path: '', component: pages.projectsPage },
        ],
      },
    ],
  },
];

export default routes;

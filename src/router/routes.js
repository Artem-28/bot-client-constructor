const layouts = {
  mainLayout: () => import('layouts/main-layout/main-layout'),
  emptyLayout: () => import('layouts/empty-layout/empty-layout'),
};

const pages = {
  loginPage: () => import('pages/login-page/login-page'),
  signUpPage: () => import('pages/sign-up-page/sign-up-page'),
  forgotPasswordPage: () => import('pages/forgot-password-page/forgot-password-page'),
  resetPasswordPage: () => import('pages/reset-password-page/reset-password-page'),
  mainPage: () => import('pages/main-page/main-page'),
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
      { path: '/main', component: pages.mainPage },
    ],
  },
];

export default routes;

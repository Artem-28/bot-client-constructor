const layouts = {
  mainLayout: () => import('layouts/main-layout/main-layout'),
  emptyLayout: () => import('layouts/empty-layout/empty-layout'),
};

const pages = {
  testPage: () => import('pages/test-page'),
  loginPage: () => import('pages/login-page/login-page'),
  signUpPage: () => import('pages/sign-up-page/sign-up-page'),
  forgotPasswordPage: () => import('pages/forgot-password-page/forgot-password-page'),
  resetPasswordPage: () => import('pages/reset-password-page/reset-password-page'),
};

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: layouts.emptyLayout,
    children: [
      { path: '/test', component: pages.testPage },
      { path: '/login', component: pages.loginPage },
      { path: '/sign_up', component: pages.signUpPage },
      { path: '/forgot_password', component: pages.forgotPasswordPage },
      { path: '/reset_password', component: pages.resetPasswordPage },
    ],
  },
];

export default routes;

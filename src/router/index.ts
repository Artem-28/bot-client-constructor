import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory, } from 'vue-router';

import routes from './routes';
import useCheckGuard from 'src/composition/router-guard/use-check.guard';
import { RouterGuardEnum } from 'src/types/enum/router-guard.enum';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const checkAuthorized = async () => {
    const { guard: authorizedGuard } = useCheckGuard(RouterGuardEnum.AUTHORIZED);
    return await authorizedGuard();
  };

  Router.beforeEach(async (to) => {
    const { authorized } = to.meta;
    if (!authorized) return;
    const isAuthorized = await checkAuthorized();
    if (isAuthorized) return;
    return '/auth';
  });

  return Router;
});

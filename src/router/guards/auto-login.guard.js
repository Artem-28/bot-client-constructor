import { useAuthStore } from 'src/stores';
import useToken from 'src/api/use-token';

async function autoLoginGuard(to, from, next) {
  const canLogin = Object.prototype.hasOwnProperty.call(to.meta, 'autoLogin') && to.meta.autoLogin;
  if (!canLogin) {
    next();
    return;
  }
  const token = useToken();
  const { valid } = token.get();
  if (!valid) {
    next();
    return;
  }

  const store = useAuthStore();
  if (store.user) {
    next('/main');
    return;
  }

  await store.setUser();
  if (store.user) {
    next('/main');
    return;
  }
  next();
}

export default autoLoginGuard;

import { useAuthStore } from 'src/stores';
import useToken from 'src/api/use-token';

async function autoLoginGuard(to) {
  const canLogin = Object.prototype.hasOwnProperty.call(to.meta, 'autoLogin') && to.meta.autoLogin;
  if (!canLogin) return false;

  const token = useToken();
  const { valid } = token.get();

  if (!valid) return false;

  const store = useAuthStore();

  if (store.user) return true;

  await store.setUser();

  return !!store.user;
}

export default autoLoginGuard;

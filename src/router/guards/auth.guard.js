import { useAuthStore } from 'src/stores';

async function authGuard(to) {
  const canAuth = Object.prototype.hasOwnProperty.call(to.meta, 'authorized') && to.meta.authorized;
  if (!canAuth) return true;
  const store = useAuthStore();
  await store.setUser();
  return !!store.user;
}

export default authGuard;

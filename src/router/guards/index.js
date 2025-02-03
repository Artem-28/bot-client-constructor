import authGuard from 'src/router/guards/auth.guard';
import autoLoginGuard from 'src/router/guards/auto-login.guard';

async function rootGuard(to, from, next) {
  const autoLogin = await autoLoginGuard(to);
  if (autoLogin) {
    next('/main');
    return;
  }
  const access = await authGuard(to, from);
  if (!access) {
    next('/login');
    return;
  }
  next();
}

export default rootGuard;

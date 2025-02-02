import authGuard from 'src/router/guards/auth.guard';
import autoLoginGuard from 'src/router/guards/auto-login.guard';

async function rootGuard(to, from, next) {
  await autoLoginGuard(to, from, next);
  const access = await authGuard(to, from);
  return access;
}

export default rootGuard;

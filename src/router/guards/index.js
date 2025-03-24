import authGuard from 'src/router/guards/auth.guard';
import autoLoginGuard from 'src/router/guards/auto-login.guard';
import projectGuard from 'src/router/guards/project.guard';

async function rootGuard(to, from, next) {
  const autoLogin = await autoLoginGuard(to);
  if (autoLogin) {
    next('/projects');
    return;
  }
  const access = await authGuard(to, from);
  if (!access) {
    next('/login');
    return;
  }

  await projectGuard(to);

  next();
}

export default rootGuard;

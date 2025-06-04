import authGuard from 'src/router/guards/auth.guard';
import autoLoginGuard from 'src/router/guards/auto-login.guard';
import projectGuard from 'src/router/guards/project.guard';
import permissionGuard from 'src/router/guards/permission.guard';

async function rootGuard(to, from, next) {
  const autoLogin = await autoLoginGuard(to);
  if (autoLogin) {
    next('/projects');
    return;
  }
  const authAccess = await authGuard(to, from);
  if (!authAccess) {
    next('/login');
    return;
  }

  const permissionAccess = await permissionGuard(to);
  if (!permissionAccess) {
    next('/forbidden');
    return;
  }
  await projectGuard(to);

  next();
}

export default rootGuard;

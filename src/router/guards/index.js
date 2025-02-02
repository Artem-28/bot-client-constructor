import authGuard from 'src/router/guards/auth.guard';

async function rootGuard(to, from) {
  const access = await authGuard(to, from);
  return access;
}

export default rootGuard;

import { UseRouterGuard } from 'src/types/composition.type';
import AuthService from 'src/api/modules/auth-module/auth.service';
import { useAuthUserStore } from 'stores/auth-user.store';

export const useAuthorizedGuard: UseRouterGuard = () => {
  const { setUser } = useAuthUserStore();
  const guard = async () => {
    const authUser = await AuthService.authUser();
    if (authUser) {
      setUser(authUser);
    }
    return !!authUser;
  };

  return { guard };
};

export default useAuthorizedGuard;

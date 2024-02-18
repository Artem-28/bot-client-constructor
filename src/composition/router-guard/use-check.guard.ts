import { UseCheckGuard } from 'src/types/composition.type';
import { RouterGuardEnum } from 'src/types/enum/router-guard.enum';

const useCheckGuard: UseCheckGuard = (guardName) => {
  const getGuard = async () => {
    const guards = {
      [RouterGuardEnum.AUTHORIZED]: await import('src/composition/router-guard/use-authorized.guard'),
    };
    return guards[guardName];
  };

  const guard = async () => {
    const guard = await getGuard();
    const module = guard.default();
    return !!module && await module.guard();
  };

  return { guard };
};

export default useCheckGuard;

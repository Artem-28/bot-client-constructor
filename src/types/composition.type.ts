import { Ref, UnwrapRef } from 'vue';
import { RouterGuardEnum } from 'src/types/enum/router-guard.enum';

export type UseToggle = (value: boolean, look?: boolean) => {
  isToggle: Ref<UnwrapRef<boolean>>,
  toggle: () => void;
}

export type UseCheckGuard = (guardName: RouterGuardEnum) => {
  guard: () => Promise<boolean>;
}

export type UseRouterGuard = () => {
  guard: () => Promise<boolean>;
}

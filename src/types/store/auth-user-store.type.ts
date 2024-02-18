import { UserModel } from 'src/api/modules/user-module/user.model';

export interface AuthUserState {
  user: UserModel | null;
}

import { defineStore } from 'pinia';
import { AuthUserState } from 'src/types/store/auth-user-store.type';
import { UserModel } from 'src/api/modules/user-module/user.model';

export const useAuthUserStore = defineStore('auth-user', {
  state: (): AuthUserState => ({
    user: null,
  }),
  getters: {},
  actions: {
    setUser(user: UserModel) {
      this.user = user;
    }
  },
});

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import useApi from 'src/api';

export const useAuthStore = defineStore('auth', () => {
  const api = useApi();
  const user = ref(null);

  function removeUser() {
    user.value = null;
  }

  async function setUser() {
    try {
      const { data, success } = await api.getAuthUser();
      removeUser();
      if (success) user.value = data;
    } catch (e) {
      removeUser();
    }
  }

  return {
    user: computed(() => user.value),
    removeUser,
    setUser,
  };
});

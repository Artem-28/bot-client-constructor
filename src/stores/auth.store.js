import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import api from 'src/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  function removeUser() {
    user.value = null;
  }

  async function setUser() {
    try {
      const data = await api.getAuthUser();
      console.log('USER', data);
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

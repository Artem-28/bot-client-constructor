import { defineStore } from 'pinia';
import { ref } from 'vue';
import useApi from 'src/api';

export const usePermissionsStore = defineStore('permissions', () => {
  const api = useApi();

  const permissions = ref({});

  async function getPermissions(projectId) {
    try {
      const { data, success } = await api.getPermissions(projectId);
      if (success) permissions.value[projectId] = data.permissions;
    } catch (e) {
      // something
    }
  }

  return {
    permissions,
    getPermissions,
  };
});

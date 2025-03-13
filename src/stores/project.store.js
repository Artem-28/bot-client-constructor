import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
  const project = ref(null);

  function updateProject(p) {
    project.value = p;
  }

  return {
    project: computed(() => project.value),
    updateProject,
  };
});

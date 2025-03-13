import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useScriptStore = defineStore('script', () => {
  const script = ref(null);

  function updateScript(p) {
    script.value = p;
  }

  return {
    script: computed(() => script.value),
    updateScript,
  };
});

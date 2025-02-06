import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
  const errors = ref(null);

  function setErrors(e) {
    errors.value = e;
  }

  function removeErrors() {
    errors.value = null;
  }

  return {
    errors: computed(() => errors.value),
    setErrors,
    removeErrors,
  };
});

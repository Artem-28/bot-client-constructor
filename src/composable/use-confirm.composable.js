import { computed, provide, ref } from 'vue';

const useConfirm = (key = null) => {
  const executor = ref(null);
  const isConfirm = ref(false);
  const provideData = ref(null);

  function confirm(data = null) {
    isConfirm.value = true;
    provideData.value = data;
    return new Promise((resolve, reject) => {
      executor.value = { resolve, reject };
    });
  }

  function removeConfirm() {
    isConfirm.value = false;
    executor.value = null;
    provideData.value = null;
  }

  function accept(data = true) {
    const resolve = executor.value?.resolve;
    if (typeof resolve === 'function') {
      resolve(data);
    }
    removeConfirm();
  }

  function cancel(data = false) {
    const resolve = executor.value?.resolve;
    if (typeof resolve === 'function') {
      resolve(data);
    }
    removeConfirm();
  }

  if (key) {
    provide(key, {
      isConfirm: computed(() => isConfirm.value),
      data: provideData,
      accept,
      cancel,
    });
  }

  return {
    confirm,
    accept,
    cancel,
  };
};

export default useConfirm;

import { useErrorStore } from 'src/stores';
import { computed, watch } from 'vue';
import { useQuasar } from 'quasar';

function useErrorHandler() {
  const $q = useQuasar();
  const errorStore = useErrorStore();

  const errors = computed(() => errorStore.errors);

  watch(errors, () => {
    if (!errors.value?.length) return;
    errors.value.forEach(error => errorHandler(error));
    errorStore.removeErrors();
  });

  function errorHandler(error) {
    const { messages = [] } = error;

    messages.forEach(message => showMessage(message));
  }
  function showMessage(message) {
    const options = {
      message,
      color: 'negative',
      position: 'top',
      timeout: 2000,
      actions: [
        { icon: 'close', color: 'white', round: true },
      ],
    };
    $q.notify(options);
  }
}
export default useErrorHandler;

import { computed, ref } from 'vue';
import useRouteQuery from 'src/composable/use-route-query.composable';

export const useQueryModel = (key, defaultValue = null) => {
  const { setQuery, getQuery, removeQuery } = useRouteQuery();

  const value = ref(getQuery(key, defaultValue));

  const model = computed({
    get() {
      return value.value;
    },
    async set(newValue) {
      value.value = newValue;
      // eslint-disable-next-line no-use-before-define
      await updateQuerySearch();
    },
  });

  async function updateQuerySearch() {
    let isNewValue = false;
    const type = typeof value.value;
    switch (type) {
      case 'string': {
        if (value.value && value.value.length && value.value !== defaultValue) {
          isNewValue = true;
        }
        break;
      }
      case 'number': {
        if (value.value !== defaultValue) {
          isNewValue = true;
        }
        break;
      }
      default:
        isNewValue = true;
    }

    if (isNewValue) {
      await setQuery(key, value.value);
      return;
    }
    await removeQuery(key);
  }

  return { model };
};

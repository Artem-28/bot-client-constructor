import { useRoute, useRouter } from 'vue-router';

const useRouteQuery = () => {
  const router = useRouter();
  const route = useRoute();

  async function setQuery(field, value) {
    const jsonValue = JSON.stringify(value);
    const query = route.query || {};
    if (query[field] === jsonValue) return;
    await router.push({
      query: {
        ...query,
        [field]: jsonValue,
      },
    });
  }

  function getQuery(field, defaultValue = null) {
    const query = route.query || {};
    if (!Object.prototype.hasOwnProperty.call(query, field)) return defaultValue;
    return JSON.parse(query[field]);
  }

  async function removeQuery(field) {
    const currentQuery = route.query || {};
    if (!Object.prototype.hasOwnProperty.call(currentQuery, field)) return;
    const query = { ...currentQuery };
    delete query[field];
    await router.push({ query });
  }

  return {
    setQuery,
    getQuery,
    removeQuery,
    route,
    router,
  };
};

export default useRouteQuery;

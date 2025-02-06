import { boot } from 'quasar/wrappers';
import axios from 'axios';
import appConfig from 'src/app-config';
import { useAuthStore, useErrorStore } from 'src/stores';
import useToken from 'src/api/use-token';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const { api_url } = appConfig;
const api = axios.create({ baseURL: api_url });

export default boot(({ app, router }) => {
  const errorStore = useErrorStore();

  function errorHandler(error) {
    console.log('error', error.response.data);
    const errors = error?.response?.data?.errors;
    if (errors?.length) errorStore.setErrors(errors);
    if (error.status === 401) {
      const token = useToken();
      const authStore = useAuthStore();
      token.remove();
      authStore.removeUser();
      router.push('/login');
    }
    throw error;
  }

  function responseHandler(response) {
    const { data: { data, path } } = response;
    const token = useToken();
    if (path && typeof path === 'string' && path.includes('sign-in')) {
      token.update(data);
    }
    return response;
  }

  api.interceptors.response.use(
    responseHandler,
    errorHandler,
  );

  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;

  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

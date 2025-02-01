import axios from 'axios';
import appConfig from 'src/app-config';

const { base_url } = appConfig;
console.log('base_url', base_url);
const api = axios.create({
  baseURL: base_url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    // Обработка ошибки
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.log('401');
      }
    }
    throw error;
  },
);

export default class ApiInstance {
  getToken() {
    return localStorage.getItem('authToken') | '';
  }

  async POST_WITH_TOKEN(url, payload) {
    const { data } = await api.post(url, payload, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    return data;
  }

  async GET_WITH_TOKEN(url, params) {
    const { data } = await api.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    return data;
  }
}

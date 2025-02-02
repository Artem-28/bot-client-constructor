import { api } from 'boot/axios';

export default class ApiInstance {
  get headers() {
    const data = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('accessToken');
    if (token) {
      data.Authorization = `Bearer ${token}`;
    }
    return data;
  }

  get(url, params) {
    return api.get(url, {
      params,
      headers: this.headers,
    });
  }

  post(url, payload, params) {
    return api.post(url, payload, {
      params,
      headers: this.headers,
    });
  }
}

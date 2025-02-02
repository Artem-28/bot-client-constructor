import ApiInstance from 'src/api/api-instance';

class Api extends ApiInstance {
  signIn(payload) {
    return this.post('api/v1/auth/sign-in', payload);
  }

  async getAuthUser() {
    return await this.get('api/v1/auth/user');
  }
}

const api = new Api();

const useApi = () => api;

export default useApi;

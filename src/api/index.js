import ApiInstance from 'src/api/api-instance';

class Api extends ApiInstance {
  signIn(payload) {
    return this.post('api/v1/sign-in', payload);
  }

  async getAuthUser() {
    return await this.get('api/v1/auth/user');
  }
}

export default new Api();

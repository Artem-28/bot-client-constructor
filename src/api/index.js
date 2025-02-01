import ApiInstance from 'src/api/api-instance';

class Api extends ApiInstance {
  async getUser() {
    return await this.GET_WITH_TOKEN('/auth/user');
  }
}

export default new Api();

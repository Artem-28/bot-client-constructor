import ApiInstance from 'src/api/api-instance';

class Api extends ApiInstance {
  signIn(payload) {
    return this._post('api/v1/auth/sign-in', payload);
  }

  signUp(payload) {
    return this._post('api/v1/auth/sign-up', payload);
  }

  logout() {
    return this._get('api/v1/auth/logout');
  }

  getAuthUser() {
    return this._get('api/v1/auth/user');
  }

  signUpConfirmMessage(payload) {
    return this._post('api/v1/auth/sign-up/confirm-message', payload);
  }

  resetPasswordMessage(payload) {
    return this._post('api/v1/auth/reset-password/confirm-message', payload);
  }

  resetPassword(payload) {
    return this._post('api/v1/auth/reset-password', payload);
  }

  checkConfirmCode(payload) {
    return this._post('api/v1/confirm-code/check', payload);
  }
}

const api = new Api();

const useApi = () => api;

export default useApi;

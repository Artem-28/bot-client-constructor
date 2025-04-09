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

  getProjects() {
    return this._get('api/v1/projects');
  }

  getProject(projectId) {
    return this._get(`api/v1/projects/${projectId}`);
  }

  createProject(payload) {
    return this._post('api/v1/projects', payload);
  }

  createScript({ projectId, payload }) {
    return this._post(`api/v1/projects/${projectId}/scripts`, payload);
  }

  getScripts(projectId) {
    return this._get(`api/v1/projects/${projectId}/scripts`);
  }

  getScript({ projectId, scriptId }) {
    return this._get(`api/v1/projects/${projectId}/scripts/${scriptId}`);
  }

  deleteScript({ projectId, scriptId }) {
    return this._delete(`api/v1/projects/${projectId}/scripts/${scriptId}`);
  }

  updateScript({ projectId, scriptId, payload }) {
    return this._patch(`api/v1/projects/${projectId}/scripts/${scriptId}`, payload);
  }

  getSubscribers(projectId) {
    return this._get(`api/v1/projects/${projectId}/subscribers`);
  }

  addSubscriber({ projectId, payload }) {
    return this._post(`api/v1/projects/${projectId}/subscribers`, payload);
  }

  deleteSubscriber({ projectId, subId }) {
    return this._delete(`api/v1/projects/${projectId}/subscribers/${subId}`);
  }

  getPermissionsList() {
    return this._get('api/v1/permissions');
  }
}

const api = new Api();

const useApi = () => api;

export default useApi;

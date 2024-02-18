import axios from 'axios';
import { Response, Token } from 'src/types/api.type';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({ baseURL: `${process.env.APP_URL}api` });

export default class BaseService {
  private readonly _tokenKey = 'access_token';
  private _token: Token = { type: null, value: null };

  constructor() {
    this._initToken();
  }

  // Получение токена
  get token() {
    const { value, type } = this._token;
    if (!value || !type) return null;
    return `${type} ${value}`;
  }

  // Получение заголовков
  private get _axiosConfig() {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    };
    // Добавление заголовка авторизации
    const token = this.token;
    if (token && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  }


  // Инициализация токена из localStorage
  private _initToken() {
    const data = localStorage.getItem(this._tokenKey);
    if (!data) return;
    const token = JSON.parse(data);
    if (!token.value || !token.type) return;
    this._token = token;
  }

  // Обновление токена в localStorage
  protected updateToken(token: Token) {
    const data = JSON.stringify(token);
    localStorage.setItem(this._tokenKey, data);
    this._token = token;
  }

  // Удаление токена
  protected clearToken() {
    this._token.type = null;
    this._token.value = null;
    localStorage.removeItem(this._tokenKey);
  }

  protected get<R>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<Response<R>>>  {
    return api.get(url,  { ...this._axiosConfig, ...config });
  }

  protected post<T, R>(url: string, dto?: T, config: AxiosRequestConfig = {}): Promise<AxiosResponse<Response<R>>>  {
    return api.post(url, dto, { ...this._axiosConfig, ...config });
  }

  protected patch<T, R>(url: string, dto: T, config: AxiosRequestConfig = {}): Promise<AxiosResponse<Response<R>>>  {
    return api.patch(url, dto, { ...this._axiosConfig, ...config });
  }

  protected delete<R>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<Response<R>>>  {
    return api.delete(url, { ...this._axiosConfig, ...config });
  }
}

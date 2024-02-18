import  BaseService from 'src/api/modules/base-module/base.service';
import { LoginDto } from 'src/api/modules/auth-module/auth.dto';
import { UserModel } from 'src/api/modules/user-module/user.model';
import { AxiosError } from 'axios';
import { Options } from 'src/types/api.type';

interface LoginResponse {
  accessToken: string;
  typeToken: string;
  user: UserModel;
}

class AuthService extends BaseService {
  private readonly _apiLogin = (dto: LoginDto) => this.post<LoginDto, LoginResponse>('auth/login', dto );
  private readonly _apiAuthUser = () => this.get<UserModel>('auth/user');

  public async login(dto: LoginDto, options?: Options): Promise<UserModel | null> {
    const throwException = options && options.throwException;

    try {
      const { data: { data } } = await this._apiLogin(dto);
      this.updateToken({ value: data.accessToken, type: data.typeToken });
      return data.user;
    } catch (e) {
      if (throwException) {
        throw new AxiosError('error');
      }
      return null;
    }
  }

  public async authUser(options?: Options):Promise<UserModel | null> {
    const throwException = options && options.throwException;
    try {
      const { data: { data } } = await this._apiAuthUser();
      return data;
    } catch (e) {
      if (throwException) {
        throw new AxiosError('error');
      }
      return null;
    }
  }
}

export default new AuthService();

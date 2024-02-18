import { BaseModel } from 'src/api/modules/base-module/base.model';

export interface UserModel extends BaseModel{
  email: string;
  phone: string | null;
  subscriptionAt: Date | null;
  emailVerifiedAt: Date | null;
  phoneVerifiedAt: Date | null;
  lastActiveAt: Date | null;
}

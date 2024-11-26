import { AccountTypeEnum } from "../enums/account-type.enum";
import { OrderEnum } from "../enums/order.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  logo?: string;
  regionId: number;
  city?: string;
  accountType: AccountTypeEnum;
  companyId?: string;
  isBlocked: boolean;
  secretKey?: string;
  verifyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ISignIn = Pick<IUser, "email" | "password">;

export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };

export interface IUserListQuery {
  limit?: number;
  page?: number;
  search?: string;
  order?: OrderEnum;
  orderBy?: UserListOrderByEnum;
}
export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "phone"
  | "logo"
  | "regionId"
  | "city"
  | "accountType"
  | "companyId"
  | "isBlocked"
  | "createdAt"
>;

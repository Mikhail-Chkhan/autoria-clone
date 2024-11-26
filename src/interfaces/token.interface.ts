import { RoleEnum } from "../enums/role.enum";

export interface IToken {
  _id?: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
  role: RoleEnum;
  permissions: string[];
  companyId: string;
}

export interface ITokenPayload {
  userId: string;
  companyId: string;
  role: RoleEnum;
  permissions: string[];
}

export interface ITokenActionPayload {
  userId: string;
  roleId: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

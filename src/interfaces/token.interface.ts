import { RoleEnum } from "../enums/role.enum";

export interface IToken {
  _id?: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
  roles: string[];
  permissions: string[];
  companyId: string;
}

export interface ITokenPayload {
  userId: string;
  companyId: string;
  roles: RoleEnum[];
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

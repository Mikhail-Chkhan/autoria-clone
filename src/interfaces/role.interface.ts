import { RoleEnum } from "../enums/role.enum";

export interface IRole {
  _id?: string;
  userId: string;
  companyId: string;
  type: RoleEnum;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRoleChange {
  userId: string;
  role: RoleEnum;
}

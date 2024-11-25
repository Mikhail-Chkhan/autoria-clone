import { RoleEnum } from "../enums/role.enum";

export const MasterTokenPayload: {
  roles: RoleEnum.ADMINISTRATOR[];
  userId: string;
} = {
  userId: "super-admin-dev",
  roles: [RoleEnum.ADMINISTRATOR],
};

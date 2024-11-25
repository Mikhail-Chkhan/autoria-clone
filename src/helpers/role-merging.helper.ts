import { RoleEnum } from "../enums/role.enum";
import { IRole, IRoleMarge } from "../interfaces/role.interface";

class RoleMergingHelper {
  public roleMerging(roles: IRole[]): IRoleMarge {
    const allPermissions: string[] = [];
    const allTypes: RoleEnum[] = [];

    for (const role of roles) {
      for (const permission of role.permissions) {
        if (!allPermissions.includes(permission)) {
          allPermissions.push(permission);
        }
      }
      if (!allTypes.includes(role.type)) {
        allTypes.push(role.type);
      }
    }
    return {
      types: allTypes,
      permissions: allPermissions,
    };
  }
}

export const roleMergingHelper = new RoleMergingHelper();

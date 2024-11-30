import { roleTemplates } from "../config/roleTemplates";
import { RoleEnum } from "../enums/role.enum";
import { ApiError } from "../errors/api.error";
import { IRole } from "../interfaces/role.interface";
import { roleRepository } from "../repositories/role.repository";

export class RoleService {
  public async create(dto: Partial<IRole>): Promise<IRole> {
    const finderRole = await roleRepository.getByUserIdAndType(
      dto.userId,
      dto.type,
    );
    if (finderRole) {
      throw new ApiError(`The user already has ${dto.type} role.`, 400);
    }
    const permissions = roleTemplates[dto.type] as Array<string>;
    if (!permissions) {
      throw new ApiError(`Invalid role type: ${dto.type}.`, 400);
    }
    return await roleRepository.create({
      ...dto,
      permissions,
    });
  }

  public async updateRole(
    userId: string,
    typeRole: RoleEnum,
  ): Promise<{ message: string }> {
    try {
      const role = await roleRepository.getByUserId(userId);
      const newPermission = (await roleTemplates[typeRole]) as Array<string>;
      await roleRepository.update(role._id, { permissions: newPermission });
      return { message: `User role ${role._id} update  successful` };
    } catch (e) {
      throw new ApiError(e.message, e.status || 500);
    }
  }
}
export const roleService = new RoleService();

import { roleTemplates } from "../config/roleTemplates";
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
  public async getAllRolesByUserId(userId: string): Promise<IRole> {
    return await roleRepository.getByUserId(userId);
  }
}
export const roleService = new RoleService();

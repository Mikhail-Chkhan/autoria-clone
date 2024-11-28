import { IRole } from "../interfaces/role.interface";
import { Role } from "../models/role.model";

class RoleRepository {
  public async create(role: Partial<IRole>): Promise<IRole> {
    return await Role.create(role);
  }
  public async update(
    roleId: string,
    updateData: Partial<IRole>,
  ): Promise<IRole> {
    return await Role.findByIdAndUpdate(roleId, updateData);
  }
  public async getByUserIdAndType(
    userId: string,
    type: string,
  ): Promise<IRole | null> {
    return await Role.findOne({ userId, type });
  }

  public async getByUserId(userId: string): Promise<IRole> {
    return await Role.findOne({ userId });
  }
  public async removeByUserId(userId: string): Promise<void> {
    await Role.deleteMany({ userId });
  }
}

export const roleRepository = new RoleRepository();

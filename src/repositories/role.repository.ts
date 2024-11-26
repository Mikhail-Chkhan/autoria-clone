import { IRole } from "../interfaces/role.interface";
import { Role } from "../models/role.model";

class RoleRepository {
  public async create(role: Partial<IRole>): Promise<IRole> {
    return await Role.create(role);
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
}

export const roleRepository = new RoleRepository();

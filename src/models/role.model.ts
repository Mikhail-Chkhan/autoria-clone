import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IRole } from "../interfaces/role.interface";

const roleSchema = new Schema(
  {
    userId: { type: String, required: true },
    companyId: { type: String, required: false },
    type: { type: String, required: true, enum: RoleEnum },
    permissions: { type: [String], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Role = model<IRole>("roles", roleSchema);

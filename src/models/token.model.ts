import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IToken } from "../interfaces/token.interface";

const tokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      required: true,
    },
    permissions: [{ type: String, required: true }],
    companyId: { type: Schema.Types.ObjectId, ref: "Company", default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<IToken>("tokens", tokenSchema);

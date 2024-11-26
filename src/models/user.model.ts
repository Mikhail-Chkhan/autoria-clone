import { model, Schema } from "mongoose";

import { AccountTypeEnum } from "../enums/account-type.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isBlocked: { type: Boolean, default: false },
    phone: { type: String, required: true },
    logo: { type: String, required: false },
    regionId: { type: Number, required: true },
    city: { type: String, required: false },
    accountType: {
      type: String,
      enum: AccountTypeEnum,
      default: AccountTypeEnum.BASIC,
    },
    companyId: { type: Number, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("users", userSchema);

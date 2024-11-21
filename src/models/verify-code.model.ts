import { model, Schema } from "mongoose";

import { IVerifyCode } from "../interfaces/verify-code.interface";

const verifyCodeSchema = new Schema(
  {
    email: { type: String, required: true },
    verifyCode: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const VerifyCode = model<IVerifyCode>("verifyCodes", verifyCodeSchema);

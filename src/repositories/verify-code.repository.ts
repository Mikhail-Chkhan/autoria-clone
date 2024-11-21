import {
  IVerifyCode,
  IVerifyCodePayload,
} from "../interfaces/verify-code.interface";
import { VerifyCode } from "../models/verify-code.model";

class VerifyCodeRepository {
  public async create(dto: Partial<IVerifyCode>): Promise<IVerifyCodePayload> {
    return await VerifyCode.create(dto);
  }

  public async findByParams(
    params: Partial<IVerifyCode>,
  ): Promise<IVerifyCode | null> {
    return await VerifyCode.findOne(params);
  }

  public async deleteByParams(params: Partial<IVerifyCode>): Promise<void> {
    await VerifyCode.deleteOne(params);
  }

  public async deleteManyByParams(params: Partial<IVerifyCode>): Promise<void> {
    await VerifyCode.deleteMany(params);
  }

  public async deleteBeforeDate(date: Date): Promise<number> {
    const { deletedCount } = await VerifyCode.deleteMany({
      createdAt: { $lt: date },
    });
    return deletedCount;
  }
}

export const verifyCodeRepository = new VerifyCodeRepository();

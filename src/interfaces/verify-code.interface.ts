export interface IVerifyCode {
  _id?: string;
  email: string;
  isVerified: boolean;
  verifyCode: string;
}

export interface IVerifyCodePayload {
  email: string;
  verifyCode: string;
  isVerified?: boolean;
}

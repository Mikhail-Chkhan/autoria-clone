export interface IVerifyCode {
  _id?: string;
  email: string;
  verifyCode: string;
}

export interface IVerifyCodePayload {
  email: string;
  verifyCode: string;
}

import crypto from "crypto";

class GenerateCode {
  public EmailVerificationCode(length = 6) {
    return crypto.randomBytes(length).toString("hex").slice(0, length); // Например, "a1b2c3"
  }
}
export const generateCode = new GenerateCode();

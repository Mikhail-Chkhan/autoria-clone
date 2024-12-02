import { ObjectCannedACL } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT || 3001,
  APP_HOST: process.env.APP_HOST,

  MONGO_URI: process.env.MONGO_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  VERIFY_CODE_EXPIRATION: process.env.VERIFY_CODE_EXPIRATION,

  ACTION_FORGOT_PASSWORD_SECRET: process.env.ACTION_FORGOT_PASSWORD_SECRET,
  ACTION_FORGOT_PASSWORD_EXPIRATION:
    process.env.ACTION_FORGOT_PASSWORD_EXPIRATION,
  ACTION_VERIFY_EMAIL_SECRET: process.env.ACTION_VERIFY_EMAIL_SECRET,
  ACTION_VERIFY_EMAIL_EXPIRATION: process.env.ACTION_VERIFY_EMAIL_EXPIRATION,

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_ACL: process.env.AWS_S3_ACL as ObjectCannedACL,
  AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT,

  API_URL_PRIVAT_BANK: process.env.API_URL_PRIVAT_BANK,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { AccountTypeEnum } from "../enums/account-type.enum";
import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export class UserValidator {
  private static name = joi.string().min(3).max(20).trim();
  private static email = joi
    .string()
    .lowercase()
    .trim()
    .regex(regexConstant.EMAIL);
  private static password = joi.string().trim().regex(regexConstant.PASSWORD);
  private static phone = joi.string().trim().regex(regexConstant.PHONE);

  public static create = joi.object({
    name: this.name.required(),
    email: this.email.required(),
    password: this.password.required(),
    verifyCode: joi.string().required(),
    phone: this.phone.required(),
    regionId: joi.number().integer().min(1).max(26).required(),
    city: joi.string().trim().lowercase().min(3).max(30),
  });
  public static createAdmin = joi.object({
    name: this.name.required(),
    email: this.email.required(),
    password: this.password.required(),
    secretKey: joi.string().required(),
    phone: this.phone.required(),
    regionId: joi.number().integer().min(1).max(26).required(),
    city: joi.string().trim().lowercase().min(3).max(30),
  });

  public static update = joi.object({
    name: this.name.required(),
    phone: this.phone.required(),
    regionId: joi.number().integer().min(1).max(26).required(),
    city: joi.string().trim().lowercase().min(3).max(30),
  });

  public static updateAdmin = joi.object({
    name: this.name,
    phone: this.phone,
    email: this.email,
    regionId: joi.number().integer().min(1).max(26),
    city: joi.string().trim().lowercase().min(3).max(30),
    accountType: joi.string().valid(...Object.values(AccountTypeEnum)),
    companyId: joi.string(),
    isBlocked: joi.boolean(),
  });

  public static updateForPatch = joi.object({
    name: this.name,
    phone: this.phone,
    regionId: joi.number().integer().min(1).max(26),
    city: joi.string().trim().lowercase().min(3).max(30),
  });

  public static signIn = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static changePassword = joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  public static changeEmail = joi.object({
    email: this.email.required(),
    verifyCode: joi.string().required(),
  });

  public static checkEmail = joi.object({
    email: this.email.required(),
  });
  public static setPassword = joi.object({
    password: this.password.required(),
    token: joi.string().required(),
  });
  public static VerifyCode = joi.object({
    email: this.email.required(),
    verifyCode: joi.string().required(),
  });
  public static listQuery = joi.object({
    limit: joi.number().min(1).max(100).default(10),
    page: joi.number().min(1).default(1),
    search: joi.string().trim().lowercase(),
    order: joi
      .string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(UserListOrderByEnum))
      .default(UserListOrderByEnum.CREATED),
  });
  public static changeRole = joi.object({
    userId: joi.string().max(100).required(),
    role: joi
      .string()
      .valid(...Object.values(RoleEnum))
      .required(),
  });
}

export const userValidator = new UserValidator();

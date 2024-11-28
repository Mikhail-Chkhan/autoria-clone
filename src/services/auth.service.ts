import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { RoleEnum } from "../enums/role.enum";
import { TypeRegEnum } from "../enums/type-reg.enum";
import { TypeVerifyEnum } from "../enums/type-verify.enum";
import { ApiError } from "../errors/api.error";
import { generateCode } from "../helpers/generateCode.helper";
import { IRole, IRoleChange } from "../interfaces/role.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
  IResetPasswordSet,
  ISignIn,
  IUser,
} from "../interfaces/user.interface";
import { IVerifyCodePayload } from "../interfaces/verify-code.interface";
import { userPresenter } from "../presenters/user.presenter";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { passwordRepository } from "../repositories/password.repository";
import { roleRepository } from "../repositories/role.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { verifyCodeRepository } from "../repositories/verify-code.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { roleService } from "./role.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async sendVerifyCode(
    email: string,
    type: TypeVerifyEnum,
  ): Promise<void> {
    if (type == TypeVerifyEnum.REGISTRATION) {
      await this.isEmailExistOrThrow(email);
    }
    const oldVerifyCode = await verifyCodeRepository.findByParams({ email });
    if (oldVerifyCode) {
      await verifyCodeRepository.deleteManyByParams({ email });
    }
    const verifyCode = generateCode.EmailVerificationCode(8);
    await verifyCodeRepository.create({
      verifyCode: verifyCode,
      email: email,
      isVerified: false,
    });
    await emailService.sendMail(email, EmailTypeEnum.VERIFY_EMAIL, {
      verifyCode: verifyCode,
      email: email,
    });
  }

  public async VerifyCode(dto: Partial<IVerifyCodePayload>): Promise<void> {
    const email = dto.email;
    const actualVerifyCode = await verifyCodeRepository.findByParams({ email });
    if (!actualVerifyCode) {
      throw new ApiError(
        "Verification request was not sent or is out of date",
        400,
      );
    }
    if (actualVerifyCode.verifyCode != dto.verifyCode) {
      throw new ApiError("Verify code is incorrect", 400);
    }
    await verifyCodeRepository.update(actualVerifyCode._id, {
      isVerified: true,
    });
  }

  public async signUp(
    dto: Partial<IUser>,
    typeReg: TypeRegEnum,
  ): Promise<{ tokens: ITokenPair; user: Partial<IUser> }> {
    try {
      const password = await passwordService.hashPassword(dto.password);
      const user: Partial<IUser> = await userRepository.create({
        ...dto,
        password,
      } as IUser);
      let role: IRole;
      switch (typeReg) {
        case TypeRegEnum.USER:
          role = await roleService.create({
            userId: user._id,
            companyId: null,
            type: RoleEnum.SELLER,
          });
          break;
        case TypeRegEnum.ADMIN:
          role = await roleService.create({
            userId: user._id,
            companyId: null,
            type: RoleEnum.ADMINISTRATOR,
          });
          break;
      }
      const tokens = tokenService.generateTokens({
        userId: user._id,
        role: role.type,
        companyId: null,
        permissions: role.permissions,
      });
      await tokenRepository.create({
        ...tokens,
        _userId: user._id,
        role: role.type,
        permissions: role.permissions,
      });
      await this.checkAndSavePassword({
        userId: user._id,
        password: dto.password,
      });
      await emailService.sendMail(user.email, EmailTypeEnum.WELCOME, {
        name: user.name,
      });
      const userPublicData = userPresenter.toPrivatDto(user as IUser);
      await verifyCodeRepository.deleteManyByParams({ email: user.email });
      return { user: userPublicData, tokens };
    } catch (e) {
      throw new ApiError(e.message, e.status | 500);
    }
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: Partial<IUser>; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }
    const role = await roleRepository.getByUserId(user._id);
    if (!role) {
      throw new ApiError("User without roles", 404);
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      permissions: role.permissions,
      role: role.type,
      companyId: null,
    });
    await tokenRepository.create({
      ...tokens,
      _userId: user._id,
      role: role.type,
      permissions: role.permissions,
    });
    const userPublicData = userPresenter.toPrivatDto(user);
    return { user: userPublicData, tokens };
  }

  public async refresh(
    refreshToken: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteByParams({ refreshToken });

    const allRoles = await roleRepository.getByUserId(payload.userId);
    if (!allRoles) {
      throw new ApiError("User without roles", 404);
    }
    const role = await roleRepository.getByUserId(payload.userId);
    if (!role) {
      throw new ApiError("User without roles", 404);
    }
    const tokens = tokenService.generateTokens({
      userId: payload.userId,
      permissions: role.permissions,
      role: role.type,
      companyId: null,
    });
    await tokenRepository.create({
      ...tokens,
      _userId: payload.userId,
      role: role.type,
      permissions: role.permissions,
    });
    return tokens;
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }

  public async changePassword(
    dto: { oldPassword: string; newPassword: string },
    userId: string,
  ): Promise<{ message: string }> {
    try {
      const user = await userRepository.getByIdWithPassword(userId);
      console.log(user);
      const isMatched = await passwordService.comparePassword(
        dto.oldPassword,
        user.password,
      );

      if (!isMatched) {
        throw new ApiError("Invalid password", 400);
      }
      const hashedNewPassword = await passwordService.hashPassword(
        dto.newPassword,
      );
      await this.checkAndSavePassword({
        userId: userId,
        password: dto.newPassword,
      });

      return await userRepository.update(userId, {
        password: hashedNewPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status | 500);
    }
  }

  public async resetPassword(user: IUser) {
    try {
      const role = await roleRepository.getByUserId(user._id);
      if (!role) {
        throw new ApiError("User without roles", 404);
      }
      const actionToken = tokenService.generateActionTokens(
        {
          userId: user._id,
          roleId: role._id,
        },
        ActionTokenTypeEnum.FORGOT_PASSWORD,
      );
      await actionTokenRepository.create({
        type: ActionTokenTypeEnum.FORGOT_PASSWORD,
        _userId: user._id,
        token: actionToken,
      });
      await emailService.sendMail(user.email, EmailTypeEnum.FORGOT_PASSWORD, {
        token: actionToken,
        name: user.name,
      });
      console.log("token:", actionToken);
    } catch (e) {
      throw new ApiError(e.message, e.status | 500);
    }
  }
  public async forgotPasswordSet(
    dto: IResetPasswordSet,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const password = await passwordService.hashPassword(dto.password);

    await this.checkAndSavePassword({
      userId: jwtPayload.userId,
      password: dto.password,
    });

    await userRepository.update(jwtPayload.userId, { password });

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
  }
  public async logout(
    jwtPayload: ITokenPayload,
    tokenId: string,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteByParams({ _id: tokenId });
    await emailService.sendMail(user.email, EmailTypeEnum.LOGOUT, {
      name: user.name,
    });
  }

  public async changeRole(dto: IRoleChange): Promise<{ message: string }> {
    try {
      await userService.getUser(dto.userId);
      // if (!user) {
      //   throw new ApiError("User not found", 404);
      // }
      await roleRepository.removeByUserId(dto.userId);
      await tokenRepository.deleteByParams({ _userId: dto.userId });
      const role = await roleService.create({
        userId: dto.userId,
        companyId: null,
        type: dto.role,
      });
      const tokens = tokenService.generateTokens({
        userId: role.userId,
        role: role.type,
        companyId: null,
        permissions: role.permissions,
      });
      await tokenRepository.create({
        ...tokens,
        _userId: role.userId,
        role: role.type,
        permissions: role.permissions,
      });
      return { message: `User role update successful. New roleId ${role._id}` };
    } catch (e) {
      throw new ApiError(e.message, e.status || 500);
    }
  }

  public async logoutAll(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
    await emailService.sendMail(user.email, EmailTypeEnum.LOGOUT, {
      name: user.name,
    });
  }
  private async checkAndSavePassword(dto: {
    userId: string;
    password: string;
  }) {
    try {
      const previousPasswords = await passwordRepository.findAllByUserId(
        dto.userId,
      );

      for (const oldPassword of previousPasswords) {
        const isMatched = await passwordService.comparePassword(
          dto.password,
          oldPassword.password,
        );
        if (isMatched) {
          throw new ApiError("You have already used this password before", 422);
        }
      }
      const hashedPassword = await passwordService.hashPassword(dto.password);
      await passwordRepository.create({
        password: hashedPassword,
        _userId: dto.userId,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status || 500);
    }
  }
}

export const authService = new AuthService();

import { configs } from "../config/configs";
import { IPaginatorResponse } from "../interfaces/paginator.interface";
import {
  IUser,
  IUserListQuery,
  IUserResponse,
} from "../interfaces/user.interface";

class UserPresenter {
  toPrivatDto(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      avatar: entity.logo ? `${configs.AWS_S3_ENDPOINT}/${entity.logo}` : null,
      phone: entity.phone,
      regionId: entity.regionId,
      city: entity.city,
      accountType: entity.accountType,
      companyId: entity.companyId,
      createdAt: entity.createdAt,
    };
  }

  toPublicResDto(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      phone: entity.phone,
      avatar: entity.logo ? `${configs.AWS_S3_ENDPOINT}/${entity.logo}` : null,
      companyId: entity.companyId,
    };
  }

  allDto(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      avatar: entity.logo ? `${configs.AWS_S3_ENDPOINT}/${entity.logo}` : null,
      phone: entity.phone,
      regionId: entity.regionId,
      city: entity.city,
      accountType: entity.accountType,
      companyId: entity.companyId,
      createdAt: entity.createdAt,
      isBlocked: entity.isBlocked,
      updatedAt: entity.updatedAt,
    };
  }

  public toListResDto(
    entities: IUser[],
    total: number,
    query: IUserListQuery,
  ): IPaginatorResponse<IUserResponse> {
    return {
      data: entities.map((value) => this.allDto(value)),
      total,
      orderBy: query.orderBy,
      order: query.order,
      limit: query.limit,
      page: query.page,
    };
  }
}

export const userPresenter = new UserPresenter();

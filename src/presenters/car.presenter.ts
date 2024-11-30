import { configs } from "../config/configs";
import { ICar, ICarListQuery, ICarResponse } from "../interfaces/car.interface";
import { IPaginatorResponse } from "../interfaces/paginator.interface";

class CarPresenter {
  toPrivatDto(entity: ICar) {
    return {
      _id: entity._id,
      brand: entity.brand,
      model: entity.model,
      year: entity.year,
      vin: entity.vin,
      fuelType: entity.fuelType,
      type: entity.type,
      engineCapacity: entity.engineCapacity,
      stateNumber: entity.stateNumber,
      distance: entity.distance,
      new: entity.new,
      image: entity.image,
      advertType: entity.advertType,
      regionID: entity.regionID,
      city: entity.city,
      ownerId: entity.ownerId,
      companyId: entity.companyId,
      isCarSold: entity.isCarSold,
      isActive: entity.isActive,
      createdAt: entity.createdAt,

      // avatar: entity.logo ? `${configs.AWS_S3_ENDPOINT}/${entity.logo}` : null,
    };
  }

  toPublicResDto(entity: ICar) {
    return {
      _id: entity._id,
      brand: entity.brand,
      model: entity.model,
      year: entity.year,
      vin: entity.vin,
      fuelType: entity.fuelType,
      type: entity.type,
      engineCapacity: entity.engineCapacity,
      stateNumber: entity.stateNumber,
      distance: entity.distance,
      defaultPrice: entity.defaultPrice,
      defaultCurrency: entity.defaultCurrency,
      allPrice: entity.allPrice,
      new: entity.new,
      image: entity.image ? this.endpointImg(entity.image) : null,
      advertType: entity.advertType,
      regionID: entity.regionID,
      city: entity.city,
      ownerId: entity.ownerId,
      companyId: entity.companyId,
      isCarSold: entity.isCarSold,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }

  private endpointImg(images: string[]): string[] {
    return images.map((image) => `${configs.AWS_S3_ENDPOINT}/${image}`);
  }
  public toMyCarsDto(entities: ICar[]): { data: ICar[] } {
    return {
      data: entities.map((value) => this.toPublicResDto(value)),
    };
  }
  public toListResDto(
    entities: ICar[],
    total: number,
    query: ICarListQuery,
  ): IPaginatorResponse<ICarResponse> {
    return {
      data: entities.map((value) => this.toPublicResDto(value)),
      total,
      orderBy: query.orderBy,
      order: query.order,
      limit: query.limit,
      page: query.page,
    };
  }
}

export const carPresenter = new CarPresenter();

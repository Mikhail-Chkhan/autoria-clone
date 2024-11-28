import { AccountTypeEnum } from "../enums/account-type.enum";
import { ApiError } from "../errors/api.error";
import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../repositories/car.repository";
import { userRepository } from "../repositories/user.repository";

export class CarService {
  public async create(dto: ICar): Promise<ICar> {
    const advertDouble = await carRepository.getByVinAndStatus(dto.vin, true);
    if (advertDouble) {
      throw new ApiError(
        "Active advert with this VIN code already exists",
        400,
      );
    }
    const user = await userRepository.getById(dto.ownerId);
    const countActiveAdvert = await carRepository.getCountActiveAdvert(
      dto.ownerId,
      true,
    );
    if (user.accountType == AccountTypeEnum.BASIC && countActiveAdvert >= 1) {
      throw new ApiError(
        "User with a basic account can create only 1 advert",
        400,
      );
    }
    // todo добавить отправку письма об успешном создании обяъвления
    return await carRepository.create(dto);
  }
}
export const carService = new CarService();

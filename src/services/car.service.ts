import { ApiError } from "../errors/api.error";
import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../repositories/car.repository";

export class CarService {
  public async create(dto: ICar): Promise<ICar> {
    const advertDouble = await carRepository.getByVinAndStatus(dto.vin, true);
    if (advertDouble) {
      throw new ApiError(
        "Active advert with this VIN code already exists",
        400,
      );
    }
    // todo добавить отправку письма об успешном создании обяъвления
    return await carRepository.create(dto);
  }
}
export const carService = new CarService();

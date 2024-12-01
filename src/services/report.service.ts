import redisClient from "../config/redis.client";
import { ViewPeriodEnum } from "../enums/view.period.enum";
import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";

class ReportService {
  private viewKey(carId: string, period: ViewPeriodEnum): string {
    return `views:${period}:${carId}`;
  }

  public async incrementViews(carId: string): Promise<void> {
    const periods = Object.values(ViewPeriodEnum);
    const keys = periods.map((period) => this.viewKey(carId, period));
    await redisClient.multi(keys.map((key) => ["incr", key])).exec();
  }

  public async getStats(
    carId: string,
  ): Promise<Record<ViewPeriodEnum, number>> {
    const periods = Object.values(ViewPeriodEnum);
    const keys = periods.map((period) => this.viewKey(carId, period));
    const values = await redisClient.mget(...keys);
    return periods.reduce(
      (acc, period, idx) => {
        acc[period] = parseInt(values[idx] || "0", 10);
        return acc;
      },
      {} as Record<ViewPeriodEnum, number>,
    );
  }
  public async resetViews(period: ViewPeriodEnum): Promise<void> {
    const keys = await redisClient.keys(`views:${period}:*`);
    if (keys.length) {
      await redisClient.del(keys);
    }
  }
  public async getAveragePriceByRegion(
    regionId: number,
  ): Promise<Record<string, number>> {
    if (!regionId) {
      throw new ApiError("regionId error", 500);
    }
    return await carRepository.getAveragePriceByRegion(regionId);
  }

  public async getAveragePriceAllUkraine(): Promise<Record<string, number>> {
    return await carRepository.getAveragePriceAllUkraine();
  }
}

export const reportService = new ReportService();

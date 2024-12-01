import { NextFunction, Request, Response } from "express";

import { reportService } from "../services/report.service";

class ReportController {
  public async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.carId;
      const stats = await reportService.getStats(carId);
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }

  public async getAveragePriceByRegion(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const regionId = parseInt(req.params.regionId, 10);
      const averagePrice =
        await reportService.getAveragePriceByRegion(regionId);
      res.status(200).json({ averagePriceByRegion: averagePrice });
    } catch (error) {
      next(error);
    }
  }

  public async getAveragePriceAllUkraine(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const averagePrice = await reportService.getAveragePriceAllUkraine();
      res.status(200).json({ averagePriceAllUkraine: averagePrice });
    } catch (error) {
      next(error);
    }
  }
}

export const reportController = new ReportController();

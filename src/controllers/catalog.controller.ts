import { Request, Response } from "express";

import { regionsOfUkraine } from "../constants/regionCatalog.constant";
import { CarBrandEnum } from "../enums/car-brand.enum";

class CatalogController {
  public async getCarBrand(req: Request, res: Response) {
    const CarBrandArray: string[] = Object.values(CarBrandEnum);
    res.status(200).json(CarBrandArray);
  }

  public async getRegion(req: Request, res: Response) {
    const regions = regionsOfUkraine;
    res.status(200).json(regions);
    return regions;
  }
}
export const catalogController = new CatalogController();

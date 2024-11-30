import axios from "axios";
import * as fs from "fs";
import path from "path";

import { configs } from "../config/configs";
import { CurrencyEnum } from "../enums/currency.enum";
import { ApiError } from "../errors/api.error";
import {
  ICurrencyResponse,
  IRate,
  IRateCovert,
} from "../interfaces/сurrency.interface";

class CurrencyHelper {
  private readonly fallbackRatesPath = path.resolve(
    __dirname,
    "../data/fallbackRates.json",
  );

  public async readFallbackRates(): Promise<IRateCovert> {
    const data = fs.readFileSync(this.fallbackRatesPath, "utf-8");
    return JSON.parse(data) as IRateCovert;
  }

  private saveFallbackRates(rates: IRateCovert): void {
    try {
      fs.writeFileSync(
        this.fallbackRatesPath,
        JSON.stringify(rates, null, 2),
        "utf-8",
      );
    } catch (err) {
      console.error("Failed to save fallback rates file:", err);
    }
  }

  public async fetchRates(): Promise<IRateCovert> {
    try {
      const response = await axios.get(configs.API_URL_PRIVAT_BANK);
      const PrivatBankRates = response.data as IRate[];

      if (!PrivatBankRates || PrivatBankRates.length === 0) {
        throw new Error("PrivatBank API returned an empty array");
      }
      const rates: IRateCovert = {
        [CurrencyEnum.UAH]: 1,
      };
      PrivatBankRates.forEach((rate: IRate) => {
        if (rate.ccy in CurrencyEnum) {
          rates[rate.ccy] = parseFloat(rate.sale);
        }
      });
      this.saveFallbackRates(rates);
      return rates;
    } catch (e) {
      console.error(
        "Failed to fetch rates from API, using fallback rates:",
        e.message,
      );
      return await this.readFallbackRates();
    }
  }

  public convert(
    price: number,
    currency: CurrencyEnum,
    rates: IRateCovert,
  ): ICurrencyResponse[] {
    const convertedRates: ICurrencyResponse[] = [];
    switch (currency) {
      case CurrencyEnum.UAH: {
        convertedRates.push(
          {
            ccy: CurrencyEnum.UAH,
            rate: rates[CurrencyEnum.UAH],
            price: price,
          },
          {
            ccy: CurrencyEnum.USD,
            rate: rates[CurrencyEnum.USD],
            price: price / rates[CurrencyEnum.USD],
          },
          {
            ccy: CurrencyEnum.EUR,
            rate: rates[CurrencyEnum.EUR],
            price: price / rates[CurrencyEnum.EUR],
          },
        );
        break;
      }

      case CurrencyEnum.USD: {
        const priceInUAH = price * rates[CurrencyEnum.USD];
        convertedRates.push(
          {
            ccy: CurrencyEnum.UAH,
            rate: rates[CurrencyEnum.UAH],
            price: priceInUAH,
          },
          {
            ccy: CurrencyEnum.USD,
            rate: rates[CurrencyEnum.USD],
            price: price,
          },
          {
            ccy: CurrencyEnum.EUR,
            rate: rates[CurrencyEnum.EUR],
            price: priceInUAH / rates[CurrencyEnum.EUR],
          },
        );
        break;
      }

      case CurrencyEnum.EUR: {
        const priceInUAH = price * rates[CurrencyEnum.EUR];
        convertedRates.push(
          {
            ccy: CurrencyEnum.UAH,
            rate: rates[CurrencyEnum.UAH],
            price: priceInUAH,
          },
          {
            ccy: CurrencyEnum.USD,
            rate: rates[CurrencyEnum.USD],
            price: priceInUAH / rates[CurrencyEnum.USD],
          },
          {
            ccy: CurrencyEnum.EUR,
            rate: rates[CurrencyEnum.EUR],
            price: price,
          },
        );
        break;
      }
      default:
        throw new ApiError(`Unsupported currency: ${currency}`, 400);
    }
    const roundConvertPrice = convertedRates.map((rate) => ({
      ...rate,
      price: parseFloat(rate.price.toFixed(2)),
      rate: parseFloat(rate.rate.toFixed(6)),
    }));
    return roundConvertPrice;
  }
}

export const currencyHelper = new CurrencyHelper();

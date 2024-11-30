import { CurrencyEnum } from "../enums/currency.enum";

export interface ICurrencyResponse {
  ccy: CurrencyEnum;
  rate: number;
  price: number;
}

export interface IRate {
  ccy: CurrencyEnum;
  sale: string;
}

export interface IRateCovert {
  [CurrencyEnum.UAH]: number;
  [CurrencyEnum.USD]?: number;
  [CurrencyEnum.EUR]?: number;
}

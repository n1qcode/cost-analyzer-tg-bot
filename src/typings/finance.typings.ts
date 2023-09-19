import { CurrencyEnum } from "../utils/enums";

export interface IFinanceBody {
  sum: number;
  currency: CurrencyEnum;
}

export interface IFinance {
  id: number;
  rub: string;
  usd: string;
  eur: string;
}

export interface IFinanceRotation {
  moneyBox: IFinance;
  pocketMoney: IFinance;
}

import { CurrencyEnum, FinanceActionsEnum } from "../utils/enums";
import {
  FinanceBoxesEnum,
  FinanceInputActionsEnum,
} from "../commands/finance/utils/enums";

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

export interface IMoneyBoxTransaction {
  id: number;
  season: string;
  transaction_date: string;
  sum: string;
  currency: CurrencyEnum;
  action: FinanceActionsEnum;
}

export interface IFinanceRotation {
  moneyBox: IFinance;
  pocketMoney: IFinance;
}

export type IFinanceInputActionVariants = keyof typeof FinanceInputActionsEnum;

export type IFinanceInputAction = Record<IFinanceInputActionVariants, boolean>;

export interface IFinanceStore {
  isEnter: boolean;
  isTyped: boolean;
  value: string;
  currency: CurrencyEnum;
  actionType: FinanceActionsEnum;
  boxType: FinanceBoxesEnum;
}

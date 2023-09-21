import { CurrencyEnum } from "../utils/enums";
import {
  FINANCE_ACTIONS_TYPES,
  FINANCE_INPUT_ACTIONS,
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

export interface IFinanceRotation {
  moneyBox: IFinance;
  pocketMoney: IFinance;
}

export type IFinanceInputActionVariants = keyof typeof FINANCE_INPUT_ACTIONS;

export type IFinanceInputAction = Record<IFinanceInputActionVariants, boolean>;

export interface IFinanceStore {
  isEnter: boolean;
  isTyped: boolean;
  value: string;
  currency: CurrencyEnum;
  actionType: FINANCE_ACTIONS_TYPES;
}

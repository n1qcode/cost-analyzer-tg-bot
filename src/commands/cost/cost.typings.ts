import { Context } from "telegraf";
import { CallbackQuery, Update } from "telegraf/types";

import { CostActionEnum } from "./cost.enums";

export interface ICostCommandLocalState {
  costCategories: string[];
  chosenCategory: string;
  isCatAdd: boolean;
  translator: Record<string, string>;
}
export type IActiveInputActionVariants = keyof typeof CostActionEnum;

export type IActiveInputAction = Record<IActiveInputActionVariants, boolean>;

export interface ISeeMonthCost {
  year: string;
  month: string;
  costValues: string[];
  isYearTyped: boolean;
  isMonthTyped: boolean;
  isEnter: boolean;
  isLast: boolean;
  ctx: Context<Update.CallbackQueryUpdate<CallbackQuery>> | null;
}

export interface ICreateCostCategory {
  isCostNameTyped: boolean;
  isCostTranslationTyped: boolean;
  cost_category: string;
  translation: string;
}

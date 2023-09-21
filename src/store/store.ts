import {
  ICostCommandLocalState,
  ICreateCostCategory,
  ISeeMonthCost,
} from "../commands/cost/cost.typings";
import { IFinanceStore } from "../typings/finance.typings";
import { CurrencyEnum } from "../utils/enums";
import { FINANCE_ACTIONS_TYPES } from "../commands/finance/utils/enums";

import { IStoreActiveInputAction } from "./store.interface";

export default class Store {
  static activeInputAction: IStoreActiveInputAction = {
    ADD_COST: false,
    ADD_COST_CAT: false,
    CHOOSE_MONTH: false,
    TRANSLATE_COST: false,
    FINANCE: false,
  };
  static costState: ICostCommandLocalState = {
    categoriesByFrequency: { isValid: false, frequency: [] },
    costCategories: { isValid: false, categories: [] },
    chosenCategory: "",
    isCatAdd: false,
    translator: { isValid: false, dictionary: {} },
  };
  static seeMonthCost: ISeeMonthCost = {
    costValues: [],
    isEnter: false,
    isLast: false,
    isMonthTyped: false,
    isYearTyped: false,
    month: "",
    year: "",
    ctx: null,
  };
  static createCostCategory: ICreateCostCategory = {
    isCostNameTyped: false,
    isCostTranslationTyped: false,
    cost_category: "",
    translation: "",
  };
  static finance: IFinanceStore = {
    isEnter: false,
    isTyped: false,
    value: "",
    currency: CurrencyEnum.RUB,
    actionType: FINANCE_ACTIONS_TYPES.PUT,
  };

  static resetStore(currency?: CurrencyEnum) {
    this.activeInputAction = {
      ADD_COST: false,
      ADD_COST_CAT: false,
      CHOOSE_MONTH: false,
      TRANSLATE_COST: false,
      FINANCE: false,
    };
    this.costState = {
      chosenCategory: "",
      isCatAdd: false,
      categoriesByFrequency: this.costState.categoriesByFrequency,
      costCategories: this.costState.costCategories,
      translator: this.costState.translator,
      // categoriesByFrequency: { isValid: false, frequency: [] },
      // costCategories: { isValid: false, categories: [] },
      // translator: { isValid: false, dictionary: {} },
    };
    this.seeMonthCost = {
      costValues: [],
      isEnter: false,
      isLast: false,
      isMonthTyped: false,
      isYearTyped: false,
      month: "",
      year: "",
      ctx: null,
    };
    this.createCostCategory = {
      isCostNameTyped: false,
      isCostTranslationTyped: false,
      cost_category: "",
      translation: "",
    };
    this.finance = {
      isEnter: false,
      isTyped: false,
      value: "",
      currency: this.finance.currency,
      actionType: FINANCE_ACTIONS_TYPES.PUT,
    };
  }
}

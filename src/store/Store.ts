import {
  ICostCommandLocalState,
  ICreateCostCategory,
  ISeeMonthCost,
} from "../commands/cost/cost.typings";
import { IFinanceStore } from "../typings/finance.typings";
import { CurrencyEnum, FinanceActionsEnum } from "../utils/enums";
import { FinanceBoxesEnum } from "../commands/finance/utils/enums";

import { IStoreActiveInputAction } from "./Store.typings";

class Store {
  public activeInputAction: IStoreActiveInputAction = {
    ADD_COST: false,
    ADD_COST_CAT: false,
    CHOOSE_MONTH: false,
    TRANSLATE_COST: false,
    FINANCE: false,
  };
  public costState: ICostCommandLocalState = {
    categoriesByFrequency: { isValid: false, frequency: [] },
    costCategories: { isValid: false, categories: [] },
    chosenCategory: "",
    isCatAdd: false,
    translator: { isValid: false, dictionary: {} },
  };
  public seeMonthCost: ISeeMonthCost = {
    costValues: [],
    isEnter: false,
    isLast: false,
    isMonthTyped: false,
    isYearTyped: false,
    month: "",
    year: "",
    ctx: null,
  };
  public createCostCategory: ICreateCostCategory = {
    isCostNameTyped: false,
    isCostTranslationTyped: false,
    cost_category: "",
    translation: "",
  };
  public finance: IFinanceStore = {
    isEnter: false,
    isTyped: false,
    value: "",
    currency: CurrencyEnum.RUB,
    actionType: FinanceActionsEnum.PUT,
    boxType: FinanceBoxesEnum.ACCUM,
  };

  public resetStore(currency?: CurrencyEnum) {
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
      actionType: FinanceActionsEnum.PUT,
      boxType: FinanceBoxesEnum.ACCUM,
    };
  }
}

export default class Stores {
  static add(userId: number) {
    this.stores.set(userId, new Store());
  }

  static get(userId: number) {
    if (!userId) return;
    if (!Stores.stores.has(userId)) {
      Stores.add(userId);
    }
    return Stores.stores.get(userId);
  }

  private static stores = new Map();
}

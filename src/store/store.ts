import {
  IActiveInputAction,
  ICostCommandLocalState,
  ICreateCostCategory,
  ISeeMonthCost,
} from "../commands/cost/cost.typings";

import { IStore } from "./store.interface";

export class Store implements IStore {
  activeInputAction: IActiveInputAction = {
    ADD_COST: false,
    ADD_COST_CAT: false,
    CHOOSE_MONTH: false,
    TRANSLATE_COST: false,
  };
  costState: ICostCommandLocalState = {
    categoriesByFrequency: { isValid: false, frequency: [] },
    costCategories: { isValid: false, categories: [] },
    chosenCategory: "",
    isCatAdd: false,
    translator: { isValid: false, dictionary: {} },
  };
  seeMonthCost: ISeeMonthCost = {
    costValues: [],
    isEnter: false,
    isLast: false,
    isMonthTyped: false,
    isYearTyped: false,
    month: "",
    year: "",
    ctx: null,
  };
  createCostCategory: ICreateCostCategory = {
    isCostNameTyped: false,
    isCostTranslationTyped: false,
    cost_category: "",
    translation: "",
  };

  resetStore() {
    this.activeInputAction = {
      ADD_COST: false,
      ADD_COST_CAT: false,
      CHOOSE_MONTH: false,
      TRANSLATE_COST: false,
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
  }
}

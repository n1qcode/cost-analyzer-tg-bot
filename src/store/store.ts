import {
  IActiveInputAction,
  ICostCommandLocalState,
  ISeeMonthCost,
} from "../commands/cost/cost.typings";

import { IStore } from "./store.interface";

export class Store implements IStore {
  activeInputAction: IActiveInputAction = {
    ADD_COST: false,
    ADD_COST_CAT: false,
    CHOOSE_MONTH: false,
  };
  costState: ICostCommandLocalState = {
    costCategories: [],
    chosenCategory: "",
    isCatAdd: false,
  };
  seeMonthCost: ISeeMonthCost = {
    columnText: [],
    isEnter: false,
    isLast: false,
    isMonthTyped: false,
    isYearTyped: false,
    month: "",
    year: "",
    ctx: null,
  };
}

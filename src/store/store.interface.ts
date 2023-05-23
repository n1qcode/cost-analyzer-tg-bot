import {
  IActiveInputAction,
  ICostCommandLocalState,
  ICreateCostCategory,
  ISeeMonthCost,
} from "../commands/cost/cost.typings";

export interface IStore {
  activeInputAction: IActiveInputAction;
  costState: ICostCommandLocalState;
  seeMonthCost: ISeeMonthCost;
  createCostCategory: ICreateCostCategory;
}

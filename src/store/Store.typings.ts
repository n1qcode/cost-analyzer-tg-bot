import { IActiveInputAction } from "../commands/cost/cost.typings";
import { IFinanceInputAction } from "../typings/finance.typings";

export type IStoreActiveInputAction = IActiveInputAction & IFinanceInputAction;

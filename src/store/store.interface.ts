import { IActiveInputAction } from "../commands/cost/cost.typings";
import { IFinanceInputAction } from "../commands/finance/finance.typings";

export type IStoreActiveInputAction = IActiveInputAction & IFinanceInputAction;

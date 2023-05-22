import {
  IActiveInputAction,
  ICostCommandLocalState,
} from "../commands/cost/cost.typings";

export interface IStore {
  activeInputAction: IActiveInputAction;
  costState: ICostCommandLocalState;
}

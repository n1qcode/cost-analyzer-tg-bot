import { IActiveInputAction } from "../commands/cost/cost.typings";

import { IStore } from "./store.interface";

export class Store implements IStore {
  activeInputAction: IActiveInputAction = {
    ADD_COST: false,
    ADD_COST_CAT: false,
    CHOOSE_MONTH: false,
  };
}

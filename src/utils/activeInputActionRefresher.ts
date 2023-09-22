import { IActiveInputActionVariants } from "../commands/cost/cost.typings";
import Store from "../store/Store";

const activeInputActionRefresher = (
  currentAction: IActiveInputActionVariants
) => {
  if (!Store.activeInputAction[currentAction]) {
    for (const key in Store.activeInputAction)
      Store.activeInputAction[key as IActiveInputActionVariants] = false;
    Store.activeInputAction[currentAction] = true;
  }
};

export default activeInputActionRefresher;

import { IActiveInputActionVariants } from "../commands/cost/cost.typings";
import Stores from "../store/Store";

const activeInputActionRefresher = (
  currentAction: IActiveInputActionVariants,
  userId: number
) => {
  const Store = Stores.get(userId);
  if (!Store.activeInputAction[currentAction]) {
    for (const key in Store.activeInputAction)
      Store.activeInputAction[key as IActiveInputActionVariants] = false;
    Store.activeInputAction[currentAction] = true;
  }
};

export default activeInputActionRefresher;

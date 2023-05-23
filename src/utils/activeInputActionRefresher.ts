import { IActiveInputActionVariants } from "../commands/cost/cost.typings";
import { globalStore } from "../main";

const activeInputActionRefresher = (
  currentAction: IActiveInputActionVariants
) => {
  if (!globalStore.activeInputAction[currentAction]) {
    for (const key in globalStore.activeInputAction)
      globalStore.activeInputAction[key as IActiveInputActionVariants] = false;
    globalStore.activeInputAction[currentAction] = true;
  }
};

export default activeInputActionRefresher;

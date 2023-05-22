import {
  IActiveInputAction,
  IActiveInputActionVariants,
} from "../cost.typings";

const activeInputActionRefresher = (
  activeInputAction: IActiveInputAction,
  currentAction: IActiveInputActionVariants
) => {
  if (!activeInputAction[currentAction]) {
    for (const key in activeInputAction)
      activeInputAction[key as IActiveInputActionVariants] = false;
    activeInputAction[currentAction] = true;
  }
};

export default activeInputActionRefresher;

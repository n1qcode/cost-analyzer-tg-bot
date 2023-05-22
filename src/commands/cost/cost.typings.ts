import { CostActionEnum } from "./cost.enums";

export interface ICostCommandLocalState {
  costCategories: string[];
  chosenCategory: string;
  isCatAdd: boolean;
}
export type IActiveInputActionVariants = keyof typeof CostActionEnum;

export type IActiveInputAction = Record<IActiveInputActionVariants, boolean>;

import { t } from "../i18n";
import { globalStore } from "../main";

import { CostTimeEnum } from "./enums";

const costAppearanceShaper = (data: Array<object>, costTime: CostTimeEnum) => {
  const costNiceAppearance: string[] = [];
  let dataForAnalyze = data[0];
  let amount = 0;

  if (costTime === CostTimeEnum.MONTH) {
    dataForAnalyze = data.reduce<Record<string, number>>((accum, curr) => {
      for (const [costKey, costValue] of Object.entries(curr)) {
        if (/cat/.test(String(costKey))) {
          if (!(String(costKey) in accum)) accum[String(costKey)] = +costValue;
          else accum[String(costKey)] += +costValue;
        }
      }
      return accum;
    }, {});
  }

  for (const [costKey, costValue] of Object.entries(dataForAnalyze)) {
    if (/cat/.test(costKey) && +costValue) {
      costNiceAppearance.push(
        `<code>${
          globalStore.costState.translator[costKey] ?? costKey
        }: ${costValue} ${t("currency")}.</code>`
      );
      amount += +costValue;
    }
  }

  costNiceAppearance.push(
    `<i>${t("total_spent")}</i>: <u><b>${amount.toFixed(2)}</b></u> ${t(
      "currency"
    )}.`
  );

  return costNiceAppearance;
};

export default costAppearanceShaper;

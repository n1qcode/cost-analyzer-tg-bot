import { t } from "../../../../i18n";
import Stores from "../../../../store/Store";
import { CostTimeEnum } from "../../../../utils/enums";
import sumSpaceDivider from "../../../../utils/sumSpaceDivider";
import { SPACE } from "../../../../utils/constants";

const costAppearanceShaper = (
  data: Array<object>,
  costTime: CostTimeEnum,
  userId: number
) => {
  const Store = Stores.get(userId);
  const costNiceAppearance: string[] = [];
  let dataForAnalyze = data[0];
  let amount = 0;

  if (costTime === CostTimeEnum.MONTH) {
    dataForAnalyze = data.reduce<Record<string, number>>((accum, curr) => {
      for (const [costKey, costValue] of Object.entries(curr)) {
        if (/cat/.test(String(costKey))) {
          if (!(String(costKey) in accum)) accum[String(costKey)] = +costValue;
          else
            accum[String(costKey)] = +(
              accum[String(costKey)] + +costValue
            ).toFixed(2);
        }
      }
      return accum;
    }, {});
  }

  for (const [costKey, costValue] of Object.entries(dataForAnalyze).sort(
    ([, a], [, b]) => b - a
  )) {
    if (/cat/.test(costKey) && +costValue) {
      costNiceAppearance.push(
        `<code>${
          Store.costState.translator.dictionary[costKey] ?? costKey
        }: ${sumSpaceDivider(String(costValue))}${SPACE}${t(
          "currency"
        )}.</code>`
      );
      amount += +costValue;
    }
  }

  costNiceAppearance.push(
    `<i>${t("total_spent")}</i>: <u><b>${sumSpaceDivider(
      amount.toFixed(2)
    )}</b></u>${SPACE}${t("currency")}.`
  );

  return costNiceAppearance;
};

export default costAppearanceShaper;

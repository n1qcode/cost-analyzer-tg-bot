import { IFinance } from "../../../typings/finance.typings";
import { t } from "../../../i18n";
import { CurrencyEnum } from "../../../utils/enums";

export const isEmptyFinanceInspector = (elem: IFinance | undefined) => {
  let isEmpty = true;
  for (const [key, value] of Object.entries(elem ?? {})) {
    if (key === "id") continue;
    if (+value) {
      isEmpty = false;
      break;
    }
  }
  return isEmpty;
};

export const financeAppearanceShaper = (elem: IFinance | undefined) => {
  const niceAppearance = [`<u><b>${t("finance_accumulated")}</b></u>:`];
  for (const [key, value] of Object.entries(elem ?? {})) {
    if (key === "id") continue;
    let currencyValue = `${t("currency")}.`;
    if (key === CurrencyEnum.EUR) currencyValue = t("currency_short_eur");
    if (key === CurrencyEnum.USD) currencyValue = `${t("currency_short_usd")}.`;
    niceAppearance.push(`<code>${t(key)}: ${+value} ${currencyValue}</code>`);
  }
  return niceAppearance;
};

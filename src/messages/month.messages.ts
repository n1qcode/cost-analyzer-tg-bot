import { t } from "../i18n";

import CommonMessages from "./common.messages";

const valWithCurrCode = (value: number) => {
  return CommonMessages.numWithCurrencyCode(value);
};

const valWithCurrRaw = (value: number) => {
  return CommonMessages.numWithCurrencyRaw(value);
};

const MonthsMessages = {
  constLastMonth: `<b>${t("cost_last_month_info")}</b>`,
  equal: `<b>${t("cost_last_month_equal_info")}</b>`,
  whichIs: CommonMessages.whichIs,
  thanLastMonth: CommonMessages.thanLastMonth,

  equaleMessage(value: number) {
    return `${this.equal}: ${valWithCurrCode(value)}`;
  },

  constLastMonthMessage(value: number) {
    return `${this.constLastMonth}: ${valWithCurrCode(value)}`;
  },

  percentageWithDiff(percentage: number, diff: number) {
    return `<code>${percentage}% ( ${valWithCurrRaw(diff)} )</code>`;
  },

  release(
    costValuesFirstMonth: number,
    costValuesSecondMonth: number,
    percentage: number,
    diffValue: number,
    diffInfo: string
  ) {
    const cost = this.constLastMonthMessage(costValuesFirstMonth);
    const persentage = this.percentageWithDiff(percentage, diffValue);

    return `${cost},\n${this.whichIs} ${persentage} ${diffInfo},\n${
      this.thanLastMonth
    } ( ${valWithCurrCode(costValuesSecondMonth)} ).`;
  },
} as const;

export default MonthsMessages;

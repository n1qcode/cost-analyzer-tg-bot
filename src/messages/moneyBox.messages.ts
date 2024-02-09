import { t } from "../i18n";

import CommonMessages from "./common.messages";

const NOT_ACCUM = `${t("no_cur_month_accum")}`;

const valWithCurrCode = (value: number) => {
  return CommonMessages.numWithCurrencyCode(value);
};

const valWithCurrRaw = (value: number) => {
  return CommonMessages.numWithCurrencyRaw(value);
};

const MoneyBoxMessages = {
  accum: `<b>${t("accumulated_finance")}</b>`,
  notAccum: `<b>${NOT_ACCUM}</b> ⚠️`,
  notAccumAndReduce: `<b>${NOT_ACCUM}, ${t("reduce_money_box")}</b>`,
  equal: `<b>${t("finance_last_month_equal_info")}</b>`,
  whichIs: `<i>${t("which_is").toLowerCase()}</i>`,
  thanLastMonth: `<i>${t("last_month_compare_info").toLowerCase()}</i>`,

  accumMessage(value: number) {
    return `${this.accum}: ${valWithCurrCode(value)} ✅`;
  },

  notAccumAndReduceMessage(value: number) {
    return `${this.notAccumAndReduce}: ${valWithCurrCode(value)} ❗️`;
  },

  equaleMessage(value: number) {
    return `${this.equal}: ${valWithCurrCode(value)} 💤`;
  },

  percentageWithDiff(percentage: number, diff: number) {
    return `<code>${percentage}% ( ${valWithCurrRaw(diff)} )</code>`;
  },

  release(
    totalAccumSumFirstMonth: number,
    totalAccumSumSecondMonth: number,
    percentage: number,
    diffValue: number,
    diffInfo: string
  ) {
    const accum = this.accumMessage(totalAccumSumFirstMonth);
    const persentage = this.percentageWithDiff(percentage, diffValue);

    return `${accum},\n${this.whichIs} ${persentage} ${diffInfo},\n${
      this.thanLastMonth
    } ( ${valWithCurrCode(totalAccumSumSecondMonth)} )`;
  },
} as const;

export default MoneyBoxMessages;

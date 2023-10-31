import { t } from "../../i18n";
import Calculator from "../Calculator/Calculator";
import datesForCompareShaper from "../dateForCompareShaper";
import { financeService } from "../../services/finance.service";
import { FinanceActionsEnum } from "../enums";

const _moneyBoxComparatorRequest = async (year: number, month: string) => {
  try {
    const response = await financeService
      .getTransactionsFromPeriod(String(year), month)
      .then((res) => res.data);
    const { payload, error } = response;

    if (error) throw new Error(error);

    let putValue = 0;
    let takeValue = 0;

    for (const transaction of payload ?? []) {
      if (transaction.action === FinanceActionsEnum.PUT)
        putValue += +transaction.sum;
      if (transaction.action === FinanceActionsEnum.TAKE)
        takeValue += +transaction.sum;
    }

    const totalSum = putValue - takeValue;

    return { totalSum, putValue, takeValue };
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

const moneyBoxComparator = async (month: number) => {
  try {
    const { firstYear, firstMonth, secondYear, secondMonth } =
      datesForCompareShaper(month);

    const {
      totalSum: transactionsFirstMonth,
      // takeValue: takeValueFirstMonth,
      // putValue: putValueFirstMonth,
    } = await _moneyBoxComparatorRequest(firstYear, firstMonth);

    const { totalSum: transactionsSecondMonth } =
      await _moneyBoxComparatorRequest(secondYear, secondMonth);

    const diffValue = transactionsFirstMonth - transactionsSecondMonth;
    let diffInfo = "";
    let percentage = 0;

    if (transactionsFirstMonth === 0) {
      return `<b>${t("no_cur_month_accum")}</b> ⚠️`;
    }

    if (transactionsFirstMonth < 0) {
      return `<b>${t("no_cur_month_accum")}, ${t(
        "reduce_money_box"
      )}</b>: <code>${Calculator.roundHalfUp(transactionsFirstMonth)} ${t(
        "currency"
      )}.</code> ❗️`;
    }

    if (transactionsSecondMonth <= 0) {
      return `<b>${t(
        "accumulated_finance"
      )}</b>: <code>${Calculator.roundHalfUp(transactionsFirstMonth)} ${t(
        "currency"
      )}.</code> ✅`;
    }

    if (transactionsFirstMonth < transactionsSecondMonth) {
      diffInfo = `<u>${t("less").toLowerCase()}</u> ❗`;
      percentage = (diffValue / transactionsSecondMonth) * 100;
    }
    if (transactionsFirstMonth > transactionsSecondMonth) {
      diffInfo = `<u>${t("more").toLowerCase()}</u> ✅️`;
      percentage = (diffValue / transactionsFirstMonth) * 100;
    }
    if (transactionsFirstMonth === transactionsSecondMonth)
      return `<b>${t(
        "finance_last_month_equal_info"
      )}</b>: <code>${Calculator.roundHalfUp(transactionsFirstMonth)} ${t(
        "currency"
      )}.</code> 💤
     }.</code>`;

    return `<b>${t("accumulated_finance")}</b>: <code>${Calculator.roundHalfUp(
      transactionsFirstMonth
    )} ${t("currency")}.</code>,\n<i>${t(
      "which_is"
    ).toLowerCase()}</i> <code>${Calculator.roundHalfUp(
      percentage
    )}% (${Calculator.roundHalfUp(diffValue)} ${t(
      "currency"
    )}.)</code> <b>${diffInfo}</b>,\n<i>${t(
      "last_month_compare_info"
    ).toLowerCase()}</i> (<code>${Calculator.roundHalfUp(
      transactionsSecondMonth
    )} ${t("currency")}.</code>)
    `;
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

export default moneyBoxComparator;

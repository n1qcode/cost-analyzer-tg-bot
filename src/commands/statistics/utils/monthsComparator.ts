import { costService } from "../../../services/cost.service";
import { t } from "../../../i18n";
import Calculator from "../../../utils/Calculator/Calculator";

const _monthComparatorRequest = async (year: string, month: string) => {
  try {
    const monthFixed = `${+month < 11 ? "0" : ""}${month}`;
    const response = await costService
      .getMonthCost(year, monthFixed)
      .then((res) => res.data);
    const { payload, error } = response;

    if (error) throw new Error(error);

    let totalSum = 0;

    payload?.forEach((elem) => {
      for (const [costKey, costValue] of Object.entries(elem)) {
        if (/cat/.test(costKey)) totalSum += +costValue;
      }
    });

    return totalSum;
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

const monthsComparator = async (month: number) => {
  try {
    const isNewYearFirst = month - 1 === 0;
    const isNewYearSecond = month - 2 === 0;
    const isLastMonthSecond = month - 2 < 0;
    const currentYear = new Date().getFullYear();
    const firstYear = isNewYearFirst ? currentYear - 1 : currentYear;
    const secondYear = isNewYearSecond ? currentYear - 1 : currentYear;
    const firstMonth = isNewYearFirst ? 12 : month - 1;
    const secondMonth = isNewYearSecond
      ? currentYear - 1
      : isLastMonthSecond
      ? 11
      : month - 2;
    const costValuesFirstMonth = await _monthComparatorRequest(
      String(firstYear),
      String(firstMonth)
    );
    if (!costValuesFirstMonth) return;

    const costValuesSecondMonth = await _monthComparatorRequest(
      String(secondYear),
      String(secondMonth)
    );
    if (!costValuesSecondMonth) return;

    const diffValue = Math.abs(costValuesFirstMonth - costValuesSecondMonth);
    let diffInfo = "";
    let percentage = 0;

    if (costValuesFirstMonth < costValuesSecondMonth) {
      diffInfo = `<u>${t("less").toLowerCase()}</u> ✅`;
      percentage = (diffValue / costValuesSecondMonth) * 100;
    }
    if (costValuesFirstMonth > costValuesSecondMonth) {
      diffInfo = `<u>${t("more").toLowerCase()}</u>❗️️`;
      percentage = (diffValue / costValuesFirstMonth) * 100;
    }
    if (costValuesFirstMonth === costValuesSecondMonth)
      return `ℹ️ <b><u>${t("started_new_month")}</u>!</b>\n\n<i>${t(
        "cost_last_month_equal_info"
      )}</i>: <code>${Calculator.roundHalfUp(costValuesFirstMonth)} ${t(
        "currency"
      )}.</code>`;

    return `ℹ️ <b><u>${t("started_new_month")}</u>!</b>\n\n<i>${t(
      "cost_last_month_info"
    )}</i>: <code>${Calculator.roundHalfUp(costValuesFirstMonth)} ${t(
      "currency"
    )}.</code>,\n<i>${t(
      "which_is"
    ).toLowerCase()}</i> <code>${Calculator.roundHalfUp(
      percentage
    )}% (${Calculator.roundHalfUp(diffValue)} ${t(
      "currency"
    )}.)</code> <b>${diffInfo}</b>,\n<i>${t(
      "cost_last_month_compare_info"
    ).toLowerCase()}</i> (<code>${Calculator.roundHalfUp(
      costValuesSecondMonth
    )} ${t("currency")}.</code>)`;
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

export default monthsComparator;

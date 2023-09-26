import { costService } from "../../services/cost.service";
import { t } from "../../i18n";
import Calculator from "../Calculator/Calculator";
import datesForCompareShaper from "../dateForCompareShaper";

const _monthComparatorRequest = async (year: number, month: string) => {
  try {
    const response = await costService
      .getMonthCost(String(year), month)
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
    const { firstYear, firstMonth, secondYear, secondMonth } =
      datesForCompareShaper(month);
    const costValuesFirstMonth = await _monthComparatorRequest(
      firstYear,
      firstMonth
    );
    if (!costValuesFirstMonth) return;

    const costValuesSecondMonth = await _monthComparatorRequest(
      secondYear,
      secondMonth
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
      return `<b>${t(
        "cost_last_month_equal_info"
      )}</b>: <code>${Calculator.roundHalfUp(costValuesFirstMonth)} ${t(
        "currency"
      )}.</code>`;

    return `<b>${t("cost_last_month_info")}</b>: <code>${Calculator.roundHalfUp(
      costValuesFirstMonth
    )} ${t("currency")}.</code>,\n<i>${t(
      "which_is"
    ).toLowerCase()}</i> <code>${Calculator.roundHalfUp(
      percentage
    )}% (${Calculator.roundHalfUp(diffValue)} ${t(
      "currency"
    )}.)</code> <b>${diffInfo}</b>,\n<i>${t(
      "last_month_compare_info"
    ).toLowerCase()}</i> (<code>${Calculator.roundHalfUp(
      costValuesSecondMonth
    )} ${t("currency")}.</code>)`;
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

export default monthsComparator;

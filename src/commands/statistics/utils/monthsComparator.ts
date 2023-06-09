import { costService } from "../../../services/cost.service";
import { t } from "../../../i18n";
import Calculator from "../../../utils/Calculator/Calculator";

const _monthComparatorRequest = async (year: string, month: string) => {
  try {
    const monthFixed = `${+month + 1 < 11 ? "0" : ""}${month + 1}`;
    // DEBUG FIELD
    {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      console.log(
        `DEBUG TG BOT::TIME ${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
      );
      console.log("DEBUG TG BOT::_monthComparatorRequest --- ", {
        year,
        monthFixed,
      });
    }
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

    console.log("DEBUG TG BOT::_monthComparatorRequest --- ", { totalSum });

    return totalSum;
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

const monthsComparator = async (month: number) => {
  try {
    const isLastYearFirst = month - 1 < 0;
    const isLastYearSecond = month - 2 < 0;
    const currentYear = new Date().getFullYear();
    const firstYear = isLastYearFirst ? currentYear - 1 : currentYear;
    const secondYear = isLastYearSecond ? currentYear - 1 : currentYear;
    const firstMonth = isLastYearFirst ? 11 : month - 1;
    const secondMonth = isLastYearSecond ? firstMonth - 1 : month - 2;
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

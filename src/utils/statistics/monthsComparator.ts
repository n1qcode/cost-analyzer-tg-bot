import { costService } from "../../services/cost.service";
import Calculator from "../Calculator/Calculator";
import datesForCompareShaper from "../dateForCompareShaper";
import CommonMessages from "../../messages/common.messages";
import MonthsMessages from "../../messages/month.messages";

import percentageDiff from "./percentageDiff";

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

    totalSum = Calculator.roundHalfUp(totalSum);

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

    const costValuesSecondMonth = await _monthComparatorRequest(
      secondYear,
      secondMonth
    );

    const diffValue = Calculator.roundHalfUp(
      Math.abs(costValuesFirstMonth - costValuesSecondMonth)
    );
    let diffInfo = "";

    if (costValuesFirstMonth < costValuesSecondMonth) {
      diffInfo = `${CommonMessages.less} ✅`;
    }
    if (costValuesFirstMonth > costValuesSecondMonth) {
      diffInfo = `${CommonMessages.more} ❗️️`;
    }

    if (costValuesFirstMonth === costValuesSecondMonth) {
      return MonthsMessages.equaleMessage(costValuesFirstMonth);
    }

    const percentage = Calculator.roundHalfUp(
      percentageDiff(costValuesFirstMonth, costValuesSecondMonth)
    );

    return MonthsMessages.release(
      costValuesFirstMonth,
      costValuesSecondMonth,
      percentage,
      diffValue,
      diffInfo
    );
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

export default monthsComparator;

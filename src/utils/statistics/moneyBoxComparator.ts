import Calculator from "../Calculator/Calculator";
import datesForCompareShaper from "../dateForCompareShaper";
import { financeService } from "../../services/finance.service";
import { FinanceActionsEnum } from "../enums";
import MoneyBoxMessages from "../../messages/moneyBox.messages";
import CommonMessages from "../../messages/common.messages";

import percentageDiff from "./percentageDiff";

const _moneyBoxComparatorRequest = async (year: number, month: string) => {
  try {
    const response = await financeService
      .getTransactionsFromPeriod(String(year), month)
      .then((res) => res.data);
    const { payload, error } = response;

    if (error) throw new Error(error);

    let putValue = 0;
    let takenValue = 0;

    for (const transaction of payload ?? []) {
      if (transaction.action === FinanceActionsEnum.PUT)
        putValue += +transaction.sum;
      if (transaction.action === FinanceActionsEnum.TAKE)
        takenValue += +transaction.sum;
    }

    const totalAccumSum = Calculator.roundHalfUp(putValue - takenValue);

    return { totalAccumSum, putValue, takenValue };
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

const moneyBoxComparator = async (month: number) => {
  try {
    const { firstYear, firstMonth, secondYear, secondMonth } =
      datesForCompareShaper(month);

    const { totalAccumSum: totalAccumSumFirstMonth } =
      await _moneyBoxComparatorRequest(firstYear, firstMonth);

    const { totalAccumSum: totalAccumSumSecondMonth } =
      await _moneyBoxComparatorRequest(secondYear, secondMonth);

    const diffValue = Calculator.roundHalfUp(
      Math.abs(totalAccumSumFirstMonth - totalAccumSumSecondMonth)
    );
    let diffInfo = "";

    if (totalAccumSumFirstMonth === 0) {
      return MoneyBoxMessages.notAccum;
    }

    if (totalAccumSumFirstMonth < 0) {
      return MoneyBoxMessages.notAccumAndReduceMessage(totalAccumSumFirstMonth);
    }

    if (totalAccumSumSecondMonth <= 0) {
      return MoneyBoxMessages.accumMessage(totalAccumSumFirstMonth);
    }

    if (totalAccumSumFirstMonth === totalAccumSumSecondMonth) {
      return MoneyBoxMessages.equaleMessage(totalAccumSumFirstMonth);
    }

    if (totalAccumSumFirstMonth < totalAccumSumSecondMonth) {
      diffInfo = `${CommonMessages.less} ❗`;
    }
    if (totalAccumSumFirstMonth > totalAccumSumSecondMonth) {
      diffInfo = `${CommonMessages.more} ✅️`;
    }

    const percentage = Calculator.roundHalfUp(
      percentageDiff(totalAccumSumFirstMonth, totalAccumSumSecondMonth)
    );

    return MoneyBoxMessages.release(
      totalAccumSumFirstMonth,
      totalAccumSumSecondMonth,
      percentage,
      diffValue,
      diffInfo
    );
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

export default moneyBoxComparator;

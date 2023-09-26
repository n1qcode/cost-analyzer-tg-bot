import { t } from "../../i18n";
import Calculator from "../Calculator/Calculator";
import { CurrencyEnum, FinanceActionsEnum } from "../enums";
import { IMoneyBoxTransaction } from "../../typings/finance.typings";

// TODO NEVER USE THIS INTO PRODUCTION

const mockData1 = [
  // {
  //   id: 3,
  //   season: "autumn",
  //   transaction_date: "2023-09-21T21:00:00.000Z",
  //   sum: "10.00",
  //   currency: CurrencyEnum.RUB,
  //   action: FinanceActionsEnum.PUT,
  // },
  // {
  //   id: 5,
  //   season: "autumn",
  //   transaction_date: "2023-09-24T21:00:00.000Z",
  //   sum: "8.00",
  //   currency: CurrencyEnum.RUB,
  //   action: FinanceActionsEnum.TAKE,
  // },
  // {
  //   id: 6,
  //   season: "autumn",
  //   transaction_date: "2023-09-24T21:00:00.000Z",
  //   sum: "7.00",
  //   currency: CurrencyEnum.RUB,
  //   action: FinanceActionsEnum.PUT,
  // },
] as IMoneyBoxTransaction[];

const mockData2 = [
  {
    id: 3,
    season: "autumn",
    transaction_date: "2023-08-21T21:00:00.000Z",
    sum: "10.00",
    currency: CurrencyEnum.RUB,
    action: FinanceActionsEnum.PUT,
  },
  {
    id: 5,
    season: "autumn",
    transaction_date: "2023-08-24T21:00:00.000Z",
    sum: "8.00",
    currency: CurrencyEnum.RUB,
    action: FinanceActionsEnum.TAKE,
  },
  {
    id: 6,
    season: "autumn",
    transaction_date: "2023-08-24T21:00:00.000Z",
    sum: "7.00",
    currency: CurrencyEnum.RUB,
    action: FinanceActionsEnum.PUT,
  },
] as IMoneyBoxTransaction[];

const _moneyBoxComparatorRequest = async (data: IMoneyBoxTransaction[]) => {
  try {
    let putValue = 0;
    let takeValue = 0;

    for (const transaction of data ?? []) {
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

const moneyBoxComparatorForTest = async () => {
  try {
    const {
      totalSum: transactionsFirstMonth,
      takeValue: takeValueFirstMonth,
      putValue: putValueFirstMonth,
    } = await _moneyBoxComparatorRequest(mockData1);

    const {
      totalSum: transactionsSecondMonth,
      // takeValue: takeValueSecondMonth,
      // putValue: putValueSecondMonth,
    } = await _moneyBoxComparatorRequest(mockData2);

    const diffValue = transactionsFirstMonth - transactionsSecondMonth;
    let diffInfo = "";
    let percentage = 0;

    if (transactionsFirstMonth === 0) {
      // В этом месяце вы ничего не накопили
      return `<b>${t("no_cur_month_accum")}</b> ⚠️`;
    }

    if (transactionsFirstMonth < 0) {
      // В этом месяце вы ничего не накопили, а наоборот
      // уменьшили баланс копилки на .
      //TODO
      return `<b>${t("no_cur_month_accum")}, ${t(
        "reduce_money_box"
      )}</b>: <code>${Calculator.roundHalfUp(transactionsFirstMonth)} ${t(
        "currency"
      )}.</code> ❗️`;
    }

    if (transactionsSecondMonth <= 0) {
      // Накопили:
      // Внесли в копилку:
      // Взяли из копилки:
      //TODO
      return `<b>${t(
        "accumulated_finance"
      )}</b>: <code>${Calculator.roundHalfUp(transactionsFirstMonth)} ${t(
        "currency"
      )}.</code> ✅\n<i>${t(
        "put_to_money_box"
      )}</i>: <code>${Calculator.roundHalfUp(putValueFirstMonth)} ${t(
        "currency"
      )}.</code>\n<i>${t(
        "taken_from_money_box"
      )}</i>: <code>${Calculator.roundHalfUp(takeValueFirstMonth)} ${t(
        "currency"
      )}.</code>`;
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
      )}.</code> 💤\n<i>${t(
        "put_to_money_box"
      )}</i>: <code>${Calculator.roundHalfUp(putValueFirstMonth)} ${t(
        "currency"
      )}.</code>\n<i>${t(
        "taken_from_money_box"
      )}</i>: <code>${Calculator.roundHalfUp(takeValueFirstMonth)} ${t(
        "currency"
      )}.</code>`;

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
    )} ${t("currency")}.</code>)\n<i>${t(
      "put_to_money_box"
    )}</i>: <code>${Calculator.roundHalfUp(putValueFirstMonth)} ${t(
      "currency"
    )}.</code>\n<i>${t(
      "taken_from_money_box"
    )}</i>: <code>${Calculator.roundHalfUp(takeValueFirstMonth)} ${t(
      "currency"
    )}.</code>`;
  } catch (e) {
    console.log(e);
    throw new Error(`${e}`);
  }
};

export default moneyBoxComparatorForTest;

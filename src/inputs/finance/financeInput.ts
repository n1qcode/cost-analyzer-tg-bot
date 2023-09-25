import { t } from "../../i18n";
import { MONEY_REGEX } from "../../utils/constants";
import Store from "../../store/Store";
import { FinanceBoxesEnum } from "../../commands/finance/utils/enums";
import { ContextExt } from "../../typings/utility.typings";
import { FinanceActionsEnum } from "../../utils/enums";

import MoneyBoxRequests from "./requests/MoneyBoxRequests";
import PocketMoneyRequests from "./requests/PocketMoneyRequests";

const financeInput = async (ctx: ContextExt) => {
  if (Store.finance.isTyped) return;
  const value = ctx.message.text;

  if (+value <= 0 || MONEY_REGEX.test(value)) {
    Store.finance.value = value;
    Store.finance.isTyped = true;

    if (Store.finance.boxType === FinanceBoxesEnum.ACCUM) {
      if (Store.finance.actionType === FinanceActionsEnum.PUT) {
        await MoneyBoxRequests.put(ctx);
      }
      if (Store.finance.actionType === FinanceActionsEnum.TAKE) {
        await MoneyBoxRequests.take(ctx);
      }
    }
    if (Store.finance.boxType === FinanceBoxesEnum.POCKET) {
      if (Store.finance.actionType === FinanceActionsEnum.PUT) {
        await PocketMoneyRequests.put(ctx);
      }
      if (Store.finance.actionType === FinanceActionsEnum.TAKE) {
        await PocketMoneyRequests.take(ctx);
      }
    }
  } else await ctx.reply(t("typed_add_cost_incorrect"));
};

export default financeInput;

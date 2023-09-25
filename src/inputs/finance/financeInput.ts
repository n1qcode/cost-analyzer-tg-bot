import { t } from "../../i18n";
import { MONEY_REGEX } from "../../utils/constants";
import Store from "../../store/Store";
import {
  FINANCE_ACTIONS_TYPES,
  FINANCE_BOXES_ENUM,
} from "../../commands/finance/utils/enums";
import { ContextExt } from "../../typings/utility.typings";

import MoneyBoxRequests from "./requests/MoneyBoxRequests";
import PocketMoneyRequests from "./requests/PocketMoneyRequests";

const financeInput = async (ctx: ContextExt) => {
  if (Store.finance.isTyped) return;
  const value = ctx.message.text;

  if (+value <= 0 || MONEY_REGEX.test(value)) {
    Store.finance.value = value;
    Store.finance.isTyped = true;

    if (Store.finance.boxType === FINANCE_BOXES_ENUM.ACCUM) {
      if (Store.finance.actionType === FINANCE_ACTIONS_TYPES.PUT) {
        await MoneyBoxRequests.put(ctx);
      }
      if (Store.finance.actionType === FINANCE_ACTIONS_TYPES.TAKE) {
        await MoneyBoxRequests.take(ctx);
      }
    }
    if (Store.finance.boxType === FINANCE_BOXES_ENUM.POCKET) {
      if (Store.finance.actionType === FINANCE_ACTIONS_TYPES.PUT) {
        await PocketMoneyRequests.put(ctx);
      }
      if (Store.finance.actionType === FINANCE_ACTIONS_TYPES.TAKE) {
        await PocketMoneyRequests.take(ctx);
      }
    }
  } else await ctx.reply(t("typed_add_cost_incorrect"));
};

export default financeInput;

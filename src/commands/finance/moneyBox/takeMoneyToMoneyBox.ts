import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import Store from "../../../store/store";
import { FINANCE_ACTIONS_TYPES, FINANCE_INPUT_ACTIONS } from "../utils/enums";
import { t } from "../../../i18n";

const takeMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.take, async (ctx) => {
    Store.activeInputAction[FINANCE_INPUT_ACTIONS.FINANCE] = true;
    Store.finance.actionType = FINANCE_ACTIONS_TYPES.TAKE;
    await ctx.editMessageText(
      `${t("type_sum")} (${t(Store.finance.currency)}):`
    );
  });
};

export default takeMoneyToMoneyBox;

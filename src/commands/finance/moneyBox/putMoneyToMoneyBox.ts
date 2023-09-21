import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import { FINANCE_INPUT_ACTIONS } from "../utils/enums";
import Store from "../../../store/store";

const putMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.put, async (ctx) => {
    Store.activeInputAction[FINANCE_INPUT_ACTIONS.FINANCE] = true;
    await ctx.editMessageText(`${t("type_sum")}:`);
  });
};

export default putMoneyToMoneyBox;

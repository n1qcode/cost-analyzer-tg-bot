import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import {
  FINANCE_ACTIONS_TYPES,
  FINANCE_BOXES_ENUM,
  FINANCE_INPUT_ACTIONS,
} from "../utils/enums";
import Store from "../../../store/Store";

const putMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.put, async (ctx) => {
    Store.activeInputAction[FINANCE_INPUT_ACTIONS.FINANCE] = true;
    Store.finance.actionType = FINANCE_ACTIONS_TYPES.PUT;
    Store.finance.boxType = FINANCE_BOXES_ENUM.ACCUM;
    await ctx.editMessageText(
      `💰 ${t("money_box")}\n<b>${t("type_sum")} (${t(
        Store.finance.currency
      )}):</b>`,
      { parse_mode: "HTML" }
    );
  });
};

export default putMoneyToMoneyBox;

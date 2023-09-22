import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import Store from "../../../store/Store";
import {
  FINANCE_ACTIONS_TYPES,
  FINANCE_BOXES_ENUM,
  FINANCE_INPUT_ACTIONS,
} from "../utils/enums";
import { t } from "../../../i18n";

const takeMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.take, async (ctx) => {
    Store.activeInputAction[FINANCE_INPUT_ACTIONS.FINANCE] = true;
    Store.finance.actionType = FINANCE_ACTIONS_TYPES.TAKE;
    Store.finance.boxType = FINANCE_BOXES_ENUM.ACCUM;
    await ctx.editMessageText(
      `💰 ${t("money_box")}\n<b>${t("type_sum")} (${t(
        Store.finance.currency
      )}):</b>`,
      { parse_mode: "HTML" }
    );
  });
};

export default takeMoneyToMoneyBox;

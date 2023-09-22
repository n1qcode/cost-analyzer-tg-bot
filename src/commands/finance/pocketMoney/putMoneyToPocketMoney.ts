import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { POCKET_MONEY_BUTTONS } from "../utils/constants";
import {
  FINANCE_ACTIONS_TYPES,
  FINANCE_BOXES_ENUM,
  FINANCE_INPUT_ACTIONS,
} from "../utils/enums";
import Store from "../../../store/Store";

const putMoneyToPocketMoney = (bot: Telegraf<IBotContext>) => {
  bot.action(POCKET_MONEY_BUTTONS.put, async (ctx) => {
    Store.activeInputAction[FINANCE_INPUT_ACTIONS.FINANCE] = true;
    Store.finance.actionType = FINANCE_ACTIONS_TYPES.PUT;
    Store.finance.boxType = FINANCE_BOXES_ENUM.POCKET;
    await ctx.editMessageText(
      `💵 🫰 ${t("pocket_money")}\n<b>${t("type_sum")} (${t(
        Store.finance.currency
      )}):</b>`,
      { parse_mode: "HTML" }
    );
  });
};

export default putMoneyToPocketMoney;

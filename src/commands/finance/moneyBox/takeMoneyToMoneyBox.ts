import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import Store from "../../../store/Store";
import { FinanceBoxesEnum, FinanceInputActionsEnum } from "../utils/enums";
import { t } from "../../../i18n";
import { FinanceActionsEnum } from "../../../utils/enums";

const takeMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.take, async (ctx) => {
    Store.activeInputAction[FinanceInputActionsEnum.FINANCE] = true;
    Store.finance.actionType = FinanceActionsEnum.TAKE;
    Store.finance.boxType = FinanceBoxesEnum.ACCUM;
    await ctx.editMessageText(
      `💰 ${t("money_box")}\n<b>${t("type_sum")} (${t(
        Store.finance.currency
      )}):</b>`,
      { parse_mode: "HTML" }
    );
  });
};

export default takeMoneyToMoneyBox;

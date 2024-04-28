import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import { FinanceBoxesEnum, FinanceInputActionsEnum } from "../utils/enums";
import Stores from "../../../store/Store";
import { FinanceActionsEnum } from "../../../utils/enums";

const putMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.put, async (ctx) => {
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx.from.id);
    Store.activeInputAction[FinanceInputActionsEnum.FINANCE] = true;
    Store.finance.actionType = FinanceActionsEnum.PUT;
    Store.finance.boxType = FinanceBoxesEnum.ACCUM;
    await ctx.editMessageText(
      `💰 ${t("money_box")}\n<i><u>${t("put_money")}</u></i>\n<b>${t(
        "type_sum"
      )} (${t(Store.finance.currency)}):</b>`,
      { parse_mode: "HTML" }
    );
  });
};

export default putMoneyToMoneyBox;

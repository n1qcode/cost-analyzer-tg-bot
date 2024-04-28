import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { POCKET_MONEY_BUTTONS } from "../utils/constants";
import Stores from "../../../store/Store";
import { FinanceBoxesEnum, FinanceInputActionsEnum } from "../utils/enums";
import { t } from "../../../i18n";
import { FinanceActionsEnum } from "../../../utils/enums";

const takeMoneyToPocketMoney = (bot: Telegraf<IBotContext>) => {
  bot.action(POCKET_MONEY_BUTTONS.take, async (ctx) => {
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx.from.id);
    Store.activeInputAction[FinanceInputActionsEnum.FINANCE] = true;
    Store.finance.actionType = FinanceActionsEnum.TAKE;
    Store.finance.boxType = FinanceBoxesEnum.POCKET;
    await ctx.editMessageText(
      `💵 🫰 ${t("pocket_money")}\n<i><u>${t("take_money")}</u></i>\n<b>${t(
        "type_sum"
      )} (${t(Store.finance.currency)}):</b>`,
      { parse_mode: "HTML" }
    );
  });
};

export default takeMoneyToPocketMoney;

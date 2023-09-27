import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { POCKET_MONEY_BUTTONS } from "../utils/constants";
import { FinanceBoxesEnum, FinanceInputActionsEnum } from "../utils/enums";
import Store from "../../../store/Store";
import { FinanceActionsEnum } from "../../../utils/enums";

const putMoneyToPocketMoney = (bot: Telegraf<IBotContext>) => {
  bot.action(POCKET_MONEY_BUTTONS.put, async (ctx) => {
    Store.activeInputAction[FinanceInputActionsEnum.FINANCE] = true;
    Store.finance.actionType = FinanceActionsEnum.PUT;
    Store.finance.boxType = FinanceBoxesEnum.POCKET;
    await ctx.editMessageText(
      `💵 🫰 ${t("pocket_money")}\n<i><u>${t("put_money")}</u></i>\n<b>${t(
        "type_sum"
      )} (${t(Store.finance.currency)}):</b>`,
      { parse_mode: "HTML" }
    );
  });
};

export default putMoneyToPocketMoney;

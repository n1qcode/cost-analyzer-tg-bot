import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import activeInputActionRefresher from "../../../utils/activeInputActionRefresher";
import { globalStore } from "../../../main";

export const categoriesHandler = (bot: Telegraf<IBotContext>) => {
  bot.action(/^cat/, async (ctx) => {
    activeInputActionRefresher(CostActionEnum.ADD_COST);
    globalStore.costState.isCatAdd = false;
    globalStore.costState.chosenCategory = ctx.match.input;
    await ctx.editMessageText(`${t("type_amount_cost")}:`);
  });
};

import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import { globalStore } from "../../../main";

export const categoriesHandler = (bot: Telegraf<IBotContext>) => {
  bot.action(/^cat/, async (ctx) => {
    globalStore.activeInputAction[CostActionEnum.ADD_COST] = true;
    globalStore.costState.isCatAdd = false;
    globalStore.costState.chosenCategory = ctx.match.input;
    await ctx.editMessageText(`${t("type_amount_cost")}:`);
  });
};

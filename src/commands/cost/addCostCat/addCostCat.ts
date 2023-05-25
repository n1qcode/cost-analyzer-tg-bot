import { Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import { globalStore } from "../../../main";

const addCostCat = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.add_cost_cat, async (ctx) => {
    globalStore.resetStore();
    globalStore.activeInputAction[CostActionEnum.ADD_COST_CAT] = true;
    await ctx.reply(`${t("enter_new_cost_cat_id")}:`);
  });
};

export default addCostCat;

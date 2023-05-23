import { Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import activeInputActionRefresher from "../../../utils/activeInputActionRefresher";
import { CostActionEnum } from "../cost.enums";

const addCostCat = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.add_cost_cat, async (ctx) => {
    activeInputActionRefresher(CostActionEnum.ADD_COST_CAT);
    await ctx.reply(`${t("enter_new_cost_cat_id")}:`);
  });
};

export default addCostCat;

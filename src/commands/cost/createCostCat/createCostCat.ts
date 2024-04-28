import { Context, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import Stores from "../../../store/Store";

const createCostCat = async (bot: Telegraf<IBotContext>, ctx: Context) => {
  if (!ctx.from) {
    await ctx?.reply("🚫 Error: userId is not specified");
    return;
  }
  const Store = Stores.get(ctx.from.id);
  Store.activeInputAction[CostActionEnum.ADD_COST_CAT] = true;
  await ctx.reply(`${t("enter_new_cost_cat_id")}:`);
};

export default createCostCat;

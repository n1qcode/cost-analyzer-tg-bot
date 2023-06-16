import { Context, Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";
import categoriesButtonsShaper from "../../../utils/categoriesButtonsShaper";
import CostAssistant from "../utils/costAssistent";

import { categoriesHandler } from "./addCost.helpers";

const addCost = async (bot: Telegraf<IBotContext>, ctx: Context) => {
  globalStore.resetStore();
  await CostAssistant.getCostCategories(ctx);
  await CostAssistant.getTranslation(ctx);
  await CostAssistant.getFrequency(ctx);

  const categoriesButtons = categoriesButtonsShaper(
    globalStore.costState.categoriesByFrequency.frequency,
    globalStore.costState.costCategories.categories,
    globalStore.costState.translator.dictionary
  );

  await ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([...categoriesButtons]),
  });
  categoriesHandler(bot);
};

export default addCost;

import { Context, Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";
import categoriesButtonsShaper from "../../../utils/categoriesButtonsShaper";

import { categoriesHandler } from "./addCost.helpers";

const addCost = async (bot: Telegraf<IBotContext>, ctx: Context) => {
  const categoriesButtons = categoriesButtonsShaper(
    globalStore.costState.categoriesByFrequency.frequency,
    globalStore.costState.costCategories.categories,
    globalStore.costState.translator.dictionary
  );

  if (!categoriesButtons.length) return;

  await ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([...categoriesButtons]),
  });
  categoriesHandler(bot);
};

export default addCost;

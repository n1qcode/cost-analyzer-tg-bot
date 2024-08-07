import { Context, Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import Stores from "../../../store/Store";

import { categoriesButtonsShaper, categoriesHandler } from "./addCost.helpers";

const addCost = async (bot: Telegraf<IBotContext>, ctx: Context) => {
  if (!ctx.from) {
    await ctx?.reply("🚫 Error: userId is not specified");
    return;
  }
  const Store = Stores.get(ctx.from.id);
  if (!Store.costState.costCategories.categories.length) return;

  const categoriesButtons = categoriesButtonsShaper(
    Store.costState.categoriesByFrequency.frequency,
    Store.costState.costCategories.categories,
    Store.costState.translator.dictionary
  );

  if (!categoriesButtons.length) return;

  await ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([...categoriesButtons]),
  });
  categoriesHandler(bot);
};

export default addCost;

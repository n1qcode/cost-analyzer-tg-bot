import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import categoriesButtonsShaper from "../../../utils/categoriesButtonsShaper";
import Store from "../../../store/store";

export const categoriesHandler = (bot: Telegraf<IBotContext>) => {
  bot.action(/^cat/, async (ctx) => {
    Store.activeInputAction[CostActionEnum.ADD_COST] = true;
    Store.costState.isCatAdd = false;
    Store.costState.chosenCategory = ctx.match.input;
    await ctx.editMessageText(
      `<i>${t("category")}:</i> <b>${
        Store.costState.translator.dictionary[ctx.match.input] ??
        ctx.match.input
      }</b>\n${t("type_amount_cost")}:`,
      { parse_mode: "HTML" }
    );
  });
  bot.action("show_all_categories", async (ctx) => {
    const categoriesButtons = categoriesButtonsShaper(
      Store.costState.categoriesByFrequency.frequency,
      Store.costState.costCategories.categories,
      Store.costState.translator.dictionary,
      true
    );

    await ctx.editMessageText(`<b>${t("choose_cat_to_add")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([...categoriesButtons]),
    });
  });
};

import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import { globalStore } from "../../../main";
import categoriesButtonsShaper from "../../../utils/categoriesButtonsShaper";

export const categoriesHandler = (bot: Telegraf<IBotContext>) => {
  bot.action(/^cat/, async (ctx) => {
    globalStore.activeInputAction[CostActionEnum.ADD_COST] = true;
    globalStore.costState.isCatAdd = false;
    globalStore.costState.chosenCategory = ctx.match.input;
    await ctx.editMessageText(
      `<i>${t("category")}:</i> <b>${
        globalStore.costState.translator[ctx.match.input] ?? ctx.match.input
      }</b>\n${t("type_amount_cost")}:`,
      { parse_mode: "HTML" }
    );
  });
  bot.action("show_all_categories", async (ctx) => {
    const categoriesButtons = categoriesButtonsShaper(
      globalStore.costState.categoriesByFrequency,
      globalStore.costState.costCategories,
      globalStore.costState.translator,
      true
    );

    await ctx.editMessageText(`<b>${t("choose_cat_to_add")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([...categoriesButtons]),
    });
  });
};

import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import Stores from "../../../store/Store";
import { MAX_HEIGHT_CAT_BUTTONS } from "../../../utils/constants";
import { HideableIKBtn } from "../../../typings/markup";

export const categoriesButtonsShaper = (
  categoriesByFrequency: string[],
  costCategories: string[],
  translator: Record<string, string>,
  isAll = false
) => {
  let categories = categoriesByFrequency.slice(0, MAX_HEIGHT_CAT_BUTTONS);
  if (
    !isAll
      ? categories.length < MAX_HEIGHT_CAT_BUTTONS
      : categories.length < costCategories.length
  ) {
    if (isAll) categories = categoriesByFrequency.slice();
    categories.push(
      ...costCategories
        .filter((cat) => !categoriesByFrequency.includes(cat))
        .slice(
          0,
          !isAll ? MAX_HEIGHT_CAT_BUTTONS - categories.length : Infinity
        )
    );
  }
  const categoriesButtons: HideableIKBtn[][] = [];
  let tempCatBtnValue: HideableIKBtn[] = [];

  (Array.isArray(categories) ? categories : []).forEach((cat, index) => {
    if (!tempCatBtnValue.length)
      tempCatBtnValue.push(Markup.button.callback(translator[cat] ?? cat, cat));
    else {
      categoriesButtons.push([
        ...tempCatBtnValue,
        Markup.button.callback(translator[cat] ?? cat, cat),
      ]);
      tempCatBtnValue = [];
    }
    if (index === categories.length - 1 && tempCatBtnValue.length)
      categoriesButtons.push([...tempCatBtnValue]);
  });

  if (categoriesButtons.flat().length < costCategories.length)
    categoriesButtons.push([
      Markup.button.callback(t("show_all"), "show_all_categories"),
    ]);

  return categoriesButtons;
};

export const categoriesHandler = (bot: Telegraf<IBotContext>) => {
  bot.action(/^cat/, async (ctx) => {
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx?.from?.id);
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
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx.from.id);
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

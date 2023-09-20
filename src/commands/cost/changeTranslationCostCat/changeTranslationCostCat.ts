import { Context, Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CostActionEnum } from "../cost.enums";
import Store from "../../../store/store";

const changeTranslationCostCat = async (
  bot: Telegraf<IBotContext>,
  ctx: Context
) => {
  if (!Store.costState.costCategories.categories.length) return;

  await ctx.reply(`<b>${t("choose_cat_to_translate")}:</b>`, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      ...Store.costState.costCategories.categories.map((cat: string) => [
        Markup.button.callback(
          Store.costState.translator.dictionary[cat] ?? cat,
          `translate_${cat}`
        ),
      ]),
    ]),
  });
  bot.action(/^translate/, async (ctx) => {
    Store.activeInputAction[CostActionEnum.TRANSLATE_COST] = true;
    Store.costState.isCatAdd = false;
    Store.costState.chosenCategory = ctx.match.input;
    const clearCatName = ctx.match.input
      .split("_")
      .filter((cat) => cat !== "translate")
      .join("_");
    await ctx.editMessageText(
      `<i>${t("category")}:</i> <code>${
        Store.costState.translator.dictionary[clearCatName] ?? clearCatName
      }</code>\n${t("enter_translation")}:`,
      { parse_mode: "HTML" }
    );
  });
};

export default changeTranslationCostCat;

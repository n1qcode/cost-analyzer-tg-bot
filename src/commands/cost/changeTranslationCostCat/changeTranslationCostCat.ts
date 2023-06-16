import { Context, Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";
import { CostActionEnum } from "../cost.enums";
import CostAssistant from "../utils/costAssistent";

const changeTranslationCostCat = async (
  bot: Telegraf<IBotContext>,
  ctx: Context
) => {
  globalStore.resetStore();
  await CostAssistant.getCostCategories(ctx);
  await CostAssistant.getTranslation(ctx);

  await ctx.reply(`<b>${t("choose_cat_to_translate")}:</b>`, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      ...globalStore.costState.costCategories.categories.map((cat: string) => [
        Markup.button.callback(
          globalStore.costState.translator.dictionary[cat] ?? cat,
          `translate_${cat}`
        ),
      ]),
    ]),
  });
  bot.action(/^translate/, async (ctx) => {
    globalStore.activeInputAction[CostActionEnum.TRANSLATE_COST] = true;
    globalStore.costState.isCatAdd = false;
    globalStore.costState.chosenCategory = ctx.match.input;
    const clearCatName = ctx.match.input
      .split("_")
      .filter((cat) => cat !== "translate")
      .join("_");
    await ctx.editMessageText(
      `<i>${t("category")}:</i> <code>${
        globalStore.costState.translator.dictionary[clearCatName] ??
        clearCatName
      }</code>\n${t("enter_translation")}:`,
      { parse_mode: "HTML" }
    );
  });
};

export default changeTranslationCostCat;

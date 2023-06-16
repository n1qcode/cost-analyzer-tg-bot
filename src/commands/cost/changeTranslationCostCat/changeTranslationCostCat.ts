import { Markup, Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { costService } from "../../../services/cost.service";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";
import { CostActionEnum } from "../cost.enums";

const changeTranslationCostCat = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.translate_cost_cat, async (ctx) => {
    globalStore.resetStore();
    try {
      const response = await costService
        .getCostCategories()
        .then((res) => res.data);
      const { payload, error } = response;
      if (error) throw new Error(error);
      globalStore.costState.costCategories = payload ?? [];
    } catch (e) {
      console.log(e);
      await ctx.reply(t("get_cost_categories_error"));
    }

    try {
      const response = await costService
        .getTranslationCostCategory()
        .then((res) => res.data);
      const { payload, error } = response;
      if (error) throw new Error(error);
      globalStore.costState.translator = {
        isValid: true,
        dictionary: payload ?? {},
      };
    } catch (e) {
      console.log(e);
      await ctx.reply(t("get_translation_error"));
    }
    await ctx.reply(`<b>${t("choose_cat_to_translate")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        ...globalStore.costState.costCategories.map((cat: string) => [
          Markup.button.callback(
            globalStore.costState.translator.dictionary[cat] ?? cat,
            `translate_${cat}`
          ),
        ]),
      ]),
    });
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

import { Markup, Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { costService } from "../../../services/cost.service";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";
import { frequencyService } from "../../../services/frequency.service";
import categoriesButtonsShaper from "../../../utils/categoriesButtonsShaper";

import { categoriesHandler } from "./addCost.helpers";

const addCost = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.add_cost, async (ctx) => {
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

    try {
      const response = await frequencyService
        .getCategoriesByFrequency()
        .then((res) => res.data);
      const { error, payload } = response;
      if (error) throw new Error(error);
      const catByFreq =
        payload
          ?.sort((a, b) => b.count - a.count)
          .map((elem) => elem.category) ?? [];
      globalStore.costState.categoriesByFrequency = catByFreq;
    } catch (e) {
      console.log(e);
      await ctx.reply(t("get_frequency_error"));
    }

    const categoriesButtons = categoriesButtonsShaper(
      globalStore.costState.categoriesByFrequency,
      globalStore.costState.costCategories,
      globalStore.costState.translator.dictionary
    );

    await ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([...categoriesButtons]),
    });
  });
  categoriesHandler(bot);
};

export default addCost;

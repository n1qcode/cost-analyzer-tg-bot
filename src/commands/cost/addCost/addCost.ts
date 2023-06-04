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
    globalStore.costState.costCategories = await costService
      .getCostCategories()
      .then((res) => res.data);
    globalStore.costState.translator = await costService
      .getTranslationCostCategory()
      .then((res) => res.data);

    globalStore.costState.categoriesByFrequency = await frequencyService
      .getCategoriesByFrequency()
      .then((res) =>
        res.data.sort((a, b) => b.count - a.count).map((elem) => elem.category)
      );

    const categoriesButtons = categoriesButtonsShaper(
      globalStore.costState.categoriesByFrequency,
      globalStore.costState.costCategories,
      globalStore.costState.translator
    );

    await ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([...categoriesButtons]),
    });
  });
  categoriesHandler(bot);
};

export default addCost;

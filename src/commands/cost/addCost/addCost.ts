import { Markup, Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { costService } from "../../../services/cost.service";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";

import { categoriesHandler } from "./addCost.helpers";

const addCost = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.add_cost, async (ctx) => {
    globalStore.costState.costCategories = await costService
      .getCostCategories()
      .then((res) => res.data);
    globalStore.costState.translator = await costService
      .getTranslationCostCategory()
      .then((res) => res.data);
    await ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        ...(Array.isArray(globalStore.costState.costCategories)
          ? globalStore.costState.costCategories
          : []
        ).map((cat: string) => [
          Markup.button.callback(
            globalStore.costState.translator[cat] ?? cat,
            cat
          ),
        ]),
      ]),
    });
  });
  categoriesHandler(bot);
};

export default addCost;

import { Markup, Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { costService } from "../../../services/cost.service";
import translator from "../../../utils/translator";
import { t } from "../../../i18n";
import { ICostCommandLocalState } from "../cost.typings";

import categoriesHandler from "./categoriesHandler";

const addCost = (bot: Telegraf<IBotContext>) => {
  const costState: ICostCommandLocalState = {
    costCategories: [],
    chosenCategory: "",
    isCatAdd: false,
  };
  bot.hears(MAIN_BUTTONS.add_cost, async (ctx) => {
    costState.costCategories = await costService
      .getCostCategories()
      .then((res) => res.data);
    await ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        ...costState.costCategories.map((cat: string) => [
          Markup.button.callback(translator(cat), cat),
        ]),
      ]),
    });
  });
  categoriesHandler(bot, costState);
};

export default addCost;

import { Markup, Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { costService } from "../../../services/cost.service";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";
import activeInputActionRefresher from "../../../utils/activeInputActionRefresher";
import { CostActionEnum } from "../cost.enums";

const translateCostCat = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.translate_cost_cat, async (ctx) => {
    globalStore.costState.costCategories = await costService
      .getCostCategories()
      .then((res) => res.data);
    globalStore.costState.translator = await costService
      .getTranslationCostCategory()
      .then((res) => res.data);
    await ctx.reply(`<b>${t("choose_cat_to_translate")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        ...globalStore.costState.costCategories.map((cat: string) => [
          Markup.button.callback(
            globalStore.costState.translator[cat] ?? cat,
            `translate_${cat}`
          ),
        ]),
      ]),
    });
  });
  bot.action(/^translate/, async (ctx) => {
    activeInputActionRefresher(CostActionEnum.TRANSLATE_COST);
    globalStore.costState.isCatAdd = false;
    globalStore.costState.chosenCategory = ctx.match.input;
    await ctx.editMessageText(`${t("enter_translation")}:`);
  });
};

export default translateCostCat;

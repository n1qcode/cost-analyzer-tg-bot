import { Context, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { costService } from "../../../services/cost.service";
import { globalStore } from "../../../main";
import { t } from "../../../i18n";
import { frequencyService } from "../../../services/frequency.service";

class CostAssistant {
  private readonly bot: Telegraf<IBotContext>;

  constructor(bots: Telegraf<IBotContext>) {
    this.bot = bots;
  }

  static async getTranslation(ctx: Context) {
    if (globalStore.costState.translator.isValid) return;
    try {
      const response = await costService
        .getTranslationCostCategory()
        .then((res) => res.data);
      const { error, payload } = response;
      if (error) throw new Error(error);
      globalStore.costState.translator.dictionary = payload ?? {};
      globalStore.costState.translator.isValid = true;
    } catch (e) {
      console.log(e);
      await ctx.reply(t("get_translation_error"));
    }
  }

  static async getFrequency(ctx: Context) {
    if (globalStore.costState.categoriesByFrequency.isValid) return;
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
      globalStore.costState.categoriesByFrequency.frequency = catByFreq;
      globalStore.costState.categoriesByFrequency.isValid = true;
    } catch (e) {
      console.log(e);
      await ctx.reply(t("get_frequency_error"));
    }
  }

  static async getCostCategories(ctx: Context) {
    if (globalStore.costState.costCategories.isValid) return;
    try {
      const response = await costService
        .getCostCategories()
        .then((res) => res.data);
      const { payload, error } = response;
      if (error) throw new Error(error);
      globalStore.costState.costCategories.categories = payload ?? [];
      globalStore.costState.costCategories.isValid = true;
    } catch (e) {
      console.log(e);
      await ctx.reply(t("get_cost_categories_error"));
    }
  }
}

export default CostAssistant;

import { Context, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { costService } from "../../../services/cost.service";
import { t } from "../../../i18n";
import { frequencyService } from "../../../services/frequency.service";
import Stores from "../../../store/Store";

class CostAssistant {
  private readonly bot: Telegraf<IBotContext>;

  constructor(bots: Telegraf<IBotContext>) {
    this.bot = bots;
  }

  static async getTranslation(ctx: Context) {
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx.from.id);
    if (Store.costState.translator.isValid) return;
    try {
      const response = await costService
        .getTranslationCostCategory()
        .then((res) => res.data);
      const { error, payload } = response;
      if (error) throw new Error(error);
      Store.costState.translator.dictionary = payload ?? {};
      Store.costState.translator.isValid = true;
    } catch (e) {
      console.log(e);
      await ctx.reply(`🚫 ${t("get_translation_error")}`);
    }
  }

  static async getFrequency(ctx: Context) {
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx.from.id);
    if (Store.costState.categoriesByFrequency.isValid) return;
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
      Store.costState.categoriesByFrequency.frequency = catByFreq;
      Store.costState.categoriesByFrequency.isValid = true;
    } catch (e) {
      console.log(e);
      await ctx.reply(`🚫 ${t("get_frequency_error")}`);
    }
  }

  static async getCostCategories(ctx: Context) {
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx.from.id);
    if (Store.costState.costCategories.isValid) return;
    try {
      const response = await costService
        .getCostCategories()
        .then((res) => res.data);
      const { payload, error } = response;
      if (error) throw new Error(error);
      Store.costState.costCategories.categories = payload ?? [];
      Store.costState.costCategories.isValid = true;
    } catch (e) {
      console.log(e);
      await ctx.reply(`🚫 ${t("get_cost_categories_error")}`);
    }
  }
}

export default CostAssistant;

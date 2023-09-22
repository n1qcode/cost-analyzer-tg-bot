import { Context } from "telegraf";

import { t } from "../../i18n";
import { costService } from "../../services/cost.service";
import Store from "../../store/Store";

import type { Update, Message } from "telegraf/types";

const createCostCategoryInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (
    !Store.createCostCategory.isCostNameTyped &&
    !Store.createCostCategory.isCostTranslationTyped
  ) {
    Store.createCostCategory.cost_category = `cat_${ctx.message.text
      .toLowerCase()
      .split(" ")
      .join("_")}`;
    Store.createCostCategory.isCostNameTyped = true;
    await ctx.reply(`${t("enter_new_cost_cat")}:`);
    return;
  }
  if (
    Store.createCostCategory.isCostNameTyped &&
    !Store.createCostCategory.isCostTranslationTyped
  ) {
    Store.createCostCategory.translation = ctx.message.text;
    Store.createCostCategory.isCostTranslationTyped = true;
    try {
      const response = await costService
        .createCostCategory({
          cost_category: Store.createCostCategory.cost_category,
          translation: Store.createCostCategory.translation,
        })
        .then((res) => res.data);

      const { error } = response;

      if (error) throw new Error(error);

      await ctx.replyWithHTML(
        `<b>${t("added_new_cost_cat")}:</b> ${
          Store.createCostCategory.translation
        }`
      );

      Store.costState.translator.isValid = false;
      Store.costState.translator.dictionary = {};
      Store.costState.costCategories.isValid = false;
      Store.costState.costCategories.categories = [];
    } catch (e) {
      console.log(e);
      await ctx.reply(`🚫 ${t("added_new_cost_cat_error")}`);
    }
  }
};

export default createCostCategoryInput;

import { Context } from "telegraf";

import { t } from "../../i18n";
import { costService } from "../../services/cost.service";
import { globalStore } from "../../main";

import type { Update, Message } from "telegraf/types";

const addNewCostCategoryInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (
    !globalStore.createCostCategory.isCostNameTyped &&
    !globalStore.createCostCategory.isCostTranslationTyped
  ) {
    globalStore.createCostCategory.cost_category = `cat_${ctx.message.text.toLowerCase()}`;
    globalStore.createCostCategory.isCostNameTyped = true;
    await ctx.reply(`${t("enter_new_cost_cat")}:`);
    return;
  }
  if (
    globalStore.createCostCategory.isCostNameTyped &&
    !globalStore.createCostCategory.isCostTranslationTyped
  ) {
    globalStore.createCostCategory.translation = ctx.message.text;
    globalStore.createCostCategory.isCostTranslationTyped = true;
    try {
      await costService
        .createCostCategory({
          cost_category: globalStore.createCostCategory.cost_category,
          translation: globalStore.createCostCategory.translation,
        })
        .then((res) => res.data);

      await ctx.replyWithHTML(
        `<b>${t("added_new_cost_cat")}:</b> ${
          globalStore.createCostCategory.translation
        }`
      );
      globalStore.resetCreateCostCategoryState();
    } catch (e) {
      await ctx.reply(`${t("err_add_cost_req")}: ${e}`);
    }
  }
};

export default addNewCostCategoryInput;

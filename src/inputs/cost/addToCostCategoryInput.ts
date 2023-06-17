import { Context } from "telegraf";

import { globalStore } from "../../main";
import { t } from "../../i18n";
import { costService } from "../../services/cost.service";
import Calculator from "../../utils/Calculator/Calculator";

import type { Update, Message } from "telegraf/types";

const addToCostCategoryInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (globalStore.costState.isCatAdd) return;
  const sumResult = Calculator.sum(ctx.message.text);
  const { isCorrect, value: spentAmount, info } = sumResult;
  if (!isCorrect) {
    await ctx.replyWithHTML(info);
  } else {
    try {
      const response = await costService
        .addToCostCategory({
          cost_category: globalStore.costState.chosenCategory,
          cost_amount: spentAmount,
        })
        .then((res) => res.data);

      const { payload, error } = response;

      if (error) throw new Error(error);

      await ctx.replyWithHTML(
        `<b>${t("saved")}!</b>\n<i>${t("category")}:</i> ${
          globalStore.costState.translator.dictionary[
            globalStore.costState.chosenCategory
          ] ?? globalStore.costState.chosenCategory
        } <i>+ ${spentAmount} ${t("currency")}.</i>\n<i>${t(
          "amount"
        )}:</i> <u>${+(payload ?? 0)}</u> ${t("currency")}.`
      );

      globalStore.costState.isCatAdd = true;

      globalStore.costState.categoriesByFrequency.isValid = false;
      globalStore.costState.categoriesByFrequency.frequency = [];
    } catch (e) {
      console.log(e);
      await ctx.reply(`🚫 ${t("err_add_cost_req")}`);
    }
  }
};

export default addToCostCategoryInput;

import { Context } from "telegraf";

import { t } from "../../i18n";
import { costService } from "../../services/cost.service";
import Calculator from "../../utils/Calculator/Calculator";
import Store from "../../store/Store";
import sumSpaceDivider from "../../utils/sumSpaceDivider";

import type { Update, Message } from "telegraf/types";

const addToCostCategoryInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (Store.costState.isCatAdd) return;
  const sumResult = Calculator.sum(ctx.message.text);
  const { isCorrect, value: spentAmount, info } = sumResult;
  if (!isCorrect) {
    await ctx.replyWithHTML(info);
  } else {
    try {
      const response = await costService
        .addToCostCategory({
          cost_category: Store.costState.chosenCategory,
          cost_amount: spentAmount,
        })
        .then((res) => res.data);

      const { payload, error } = response;

      if (error) throw new Error(error);

      await ctx.replyWithHTML(
        `<b>${t("saved")}!</b>\n<i>${t("category")}:</i> ${
          Store.costState.translator.dictionary[
            Store.costState.chosenCategory
          ] ?? Store.costState.chosenCategory
        } <i>+ ${sumSpaceDivider(String(spentAmount))} ${t(
          "currency"
        )}.</i>\n<i>${t("amount")}:</i> <u>${sumSpaceDivider(
          String(payload ?? 0)
        )}</u> ${t("currency")}.`
      );

      Store.costState.isCatAdd = true;

      Store.costState.categoriesByFrequency.isValid = false;
      Store.costState.categoriesByFrequency.frequency = [];
    } catch (e) {
      console.log(e);
      await ctx.reply(`🚫 ${t("err_add_cost_req")}`);
    }
  }
};

export default addToCostCategoryInput;

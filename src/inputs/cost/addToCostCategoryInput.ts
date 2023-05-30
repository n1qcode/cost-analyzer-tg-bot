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
      globalStore.costState.translator = await costService
        .getTranslationCostCategory()
        .then((res) => res.data);

      await ctx.replyWithHTML(
        `<b>${t("saved")}!</b>\n${t("category")} - ${
          globalStore.costState.translator[
            globalStore.costState.chosenCategory
          ] ?? globalStore.costState.chosenCategory
        }\n<i>${t("amount")}</i> - <u>${+response.split(":").at(-1)}</u> ${t(
          "currency"
        )}.`
      );
      globalStore.costState.isCatAdd = true;
    } catch (e) {
      await ctx.reply(`${t("err_add_cost_req")}: ${e}`);
    }
  }
};

export default addToCostCategoryInput;

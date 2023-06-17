import { Context } from "telegraf";

import { t } from "../../i18n";
import { costService } from "../../services/cost.service";
import { globalStore } from "../../main";

import type { Update, Message } from "telegraf/types";

const changeTranslationCostCatInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  const translation = ctx.message.text;
  const cost_category = globalStore.costState.chosenCategory
    .split("_")
    .splice(1)
    .join("_");

  try {
    const response = await costService
      .updateTranslationCostCategory({
        cost_category,
        translation,
      })
      .then((res) => res.data);

    const { error, payload } = response;

    if (error) throw new Error(error);

    await ctx.replyWithHTML(
      `<b>${t("updated_translation")}:</b> <i>${
        globalStore.costState.translator.dictionary[cost_category] ??
        cost_category
      } --> ${payload}</i>`
    );

    globalStore.costState.translator.isValid = false;
    globalStore.costState.translator.dictionary = {};
  } catch (e) {
    console.log(e);
    await ctx.reply(t("updated_translation_error"));
  }
};

export default changeTranslationCostCatInput;

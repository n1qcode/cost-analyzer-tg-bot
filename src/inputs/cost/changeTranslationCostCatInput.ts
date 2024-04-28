import { Context } from "telegraf";

import { t } from "../../i18n";
import { costService } from "../../services/cost.service";
import Stores from "../../store/Store";

import type { Update, Message } from "telegraf/types";

const changeTranslationCostCatInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  const translation = ctx.message.text;
  const Store = Stores.get(ctx.from.id);
  const cost_category = Store.costState.chosenCategory
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
        Store.costState.translator.dictionary[cost_category] ?? cost_category
      } --> ${payload}</i>`
    );

    Store.costState.translator.isValid = false;
    Store.costState.translator.dictionary = {};
  } catch (e) {
    console.log(e);
    await ctx.reply(`🚫 ${t("updated_translation_error")}`);
  }
};

export default changeTranslationCostCatInput;

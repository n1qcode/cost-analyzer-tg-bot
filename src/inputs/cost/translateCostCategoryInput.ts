import { Context } from "telegraf";

import { t } from "../../i18n";
import { costService } from "../../services/cost.service";
import { globalStore } from "../../main";

import type { Update, Message } from "telegraf/types";

const translateCostCategoryInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  const translation = ctx.message.text;
  const cost_category = globalStore.costState.chosenCategory
    .split("_")
    .splice(1)
    .join("_");

  try {
    await costService
      .updateTranslationCostCategory({
        cost_category,
        translation,
      })
      .then((res) => res.data);

    await ctx.replyWithHTML(
      `<b>${t("updated_translation")}:</b> <i>${
        globalStore.costState.translator[cost_category] ?? cost_category
      } --> ${translation}</i>`
    );
  } catch (e) {
    await ctx.reply(`${t("updated_translation_error")}: ${e}`);
  }
};

export default translateCostCategoryInput;

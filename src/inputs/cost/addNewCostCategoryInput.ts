import { Context } from "telegraf";

import { t } from "../../i18n";
import { costService } from "../../services/cost.service";

import type { Update, Message } from "telegraf/types";

const addNewCostCategoryInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  const value = ctx.message.text.toLowerCase();
  const cost_category = `cat_${value}`;

  try {
    await costService
      .createCostCategory({
        cost_category,
      })
      .then((res) => res.data);

    await ctx.replyWithHTML(`<b>${t("added_new_cost_cat")}:</b> ${value}`);
  } catch (e) {
    await ctx.reply(`${t("err_add_cost_req")}: ${e}`);
  }
};

export default addNewCostCategoryInput;

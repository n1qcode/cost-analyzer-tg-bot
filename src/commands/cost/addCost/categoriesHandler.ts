import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { costService } from "../../../services/cost.service";
import translator from "../../../utils/translator";
import { ICostCommandLocalState } from "../cost.typings";
import { CostActionEnum } from "../cost.enums";
import activeInputActionRefresher from "../utils/activeInputActionRefresher";
import { globalStore } from "../../../main";

const categoriesHandler = (
  bot: Telegraf<IBotContext>,
  costState: ICostCommandLocalState
) => {
  bot.action(/cat/, async (ctx) => {
    activeInputActionRefresher(
      globalStore.activeInputAction,
      CostActionEnum.ADD_COST
    );
    costState.isCatAdd = false;
    costState.chosenCategory = ctx.match.input;
    await ctx.editMessageText(`${t("type_amount_cost")}:`);
    bot.hears(/.*/, async (ctx) => {
      if (costState.isCatAdd) return;
      const value = ctx.message.text;
      const spentAmount = value.includes(",")
        ? +value.split(",").join(".")
        : +value;

      if (Number.isNaN(spentAmount)) {
        await ctx.reply(t("number_check"));
      } else {
        try {
          const response = await costService
            .addToCostCategory({
              user_id: 1,
              cost_category: costState.chosenCategory,
              cost_amount: spentAmount,
            })
            .then((res) => res.data);

          await ctx.replyWithHTML(
            `<b>${t("saved")}!</b>\n${t("category")} - ${translator(
              costState.chosenCategory
            )}\n<i>${t("amount")}</i> - <u>${response
              .split(":")
              .at(-1)}</u> ${t("currency")}.`
          );
          costState.isCatAdd = true;
        } catch (e) {
          await ctx.reply(`${t("err_add_cost_req")}: ${e}`);
        }
      }
    });
  });
};

export default categoriesHandler;

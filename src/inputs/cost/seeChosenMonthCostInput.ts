import { Context } from "telegraf";

import { globalStore } from "../../main";
import { t } from "../../i18n";
import { monthCostExecutor } from "../../commands/cost/seeCost/monthCost/monthCost.helpers";

import type { Update, Message } from "telegraf/types";

const seeChosenMonthCostInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (
    globalStore.seeMonthCost.isYearTyped &&
    globalStore.seeMonthCost.isMonthTyped
  )
    return;
  const isYearValid = /^\d{4}$/;
  const isMonthValid = /^(0?[1-9]|1[0-2])$/;
  const value = ctx.message.text;

  if (
    !globalStore.seeMonthCost.isYearTyped &&
    !globalStore.seeMonthCost.isMonthTyped
  ) {
    if (isYearValid.test(value)) {
      globalStore.seeMonthCost.year = value;
      globalStore.seeMonthCost.isYearTyped = true;
      await ctx.reply(`${t("type_month")}:`);
      return;
    } else await ctx.reply(t("number_check"));
  }
  if (
    globalStore.seeMonthCost.isYearTyped &&
    !globalStore.seeMonthCost.isMonthTyped
  ) {
    if (isMonthValid.test(value)) {
      globalStore.seeMonthCost.month = value.length === 1 ? "0" + value : value;
      globalStore.seeMonthCost.isMonthTyped = true;
      await monthCostExecutor();
    } else await ctx.reply(t("number_check"));
  }
};

export default seeChosenMonthCostInput;

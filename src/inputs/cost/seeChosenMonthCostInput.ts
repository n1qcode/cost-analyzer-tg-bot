import { Context } from "telegraf";

import { t } from "../../i18n";
import { monthCostExecutor } from "../../commands/cost/seeCost/monthCost/monthCost.helpers";
import Store from "../../store/store";

import type { Update, Message } from "telegraf/types";

const seeChosenMonthCostInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (Store.seeMonthCost.isYearTyped && Store.seeMonthCost.isMonthTyped) return;
  const isYearValid = /^\d{4}$/;
  const isMonthValid = /^(0?[1-9]|1[0-2])$/;
  const value = ctx.message.text;

  if (!Store.seeMonthCost.isYearTyped && !Store.seeMonthCost.isMonthTyped) {
    if (isYearValid.test(value)) {
      Store.seeMonthCost.year = value;
      Store.seeMonthCost.isYearTyped = true;
      await ctx.reply(`${t("type_month")}:`);
      return;
    } else await ctx.reply(t("year_valid"));
  }
  if (Store.seeMonthCost.isYearTyped && !Store.seeMonthCost.isMonthTyped) {
    if (isMonthValid.test(value)) {
      Store.seeMonthCost.month = value.length === 1 ? "0" + value : value;
      Store.seeMonthCost.isMonthTyped = true;
      await monthCostExecutor();
    } else await ctx.reply(t("month_valid"));
  }
};

export default seeChosenMonthCostInput;

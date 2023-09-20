import { Context } from "telegraf";

import { t } from "../../i18n";
import { MONEY_REGEX } from "../../utils/constants";
import Store from "../../store/store";

import type { Update, Message } from "telegraf/types";

const financeInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (Store.finance.isTyped) return;
  const value = ctx.message.text;

  if (!Store.finance.isTyped) {
    if (+value <= 0 || MONEY_REGEX.test(value)) {
      if (MONEY_REGEX.test(value)) {
        Store.finance.value = value;
        Store.finance.isTyped = true;
        return;
      } else await ctx.reply(t("money_value_too_big"));
    } else await ctx.reply(t("typed_add_cost_incorrect"));
  }
};

export default financeInput;

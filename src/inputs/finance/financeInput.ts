import { Context } from "telegraf";

import { t } from "../../i18n";
import { MONEY_REGEX } from "../../utils/constants";
import Store from "../../store/store";
import { financeService } from "../../services/finance.service";
import { financeAppearanceShaper } from "../../commands/finance/utils/helpers";
import { CurrencyEnum } from "../../utils/enums";

import type { Update, Message } from "telegraf/types";

const financeInput = async (
  ctx: Context<Update.MessageUpdate<Message.TextMessage>>
) => {
  if (Store.finance.isTyped) return;
  const value = ctx.message.text;

  if (+value <= 0 || MONEY_REGEX.test(value)) {
    if (MONEY_REGEX.test(value)) {
      Store.finance.value = value;
      Store.finance.isTyped = true;
      try {
        const response = await financeService
          .putMoneyToMoneyBox({
            sum: +Store.finance.value,
            currency: Store.finance.currency,
          })
          .then((res) => res.data);
        const { payload, error } = response;

        if (error) throw new Error(error);

        const values = financeAppearanceShaper(payload);
        let currencyValue = `${t("currency")}.`;
        if (Store.finance.currency === CurrencyEnum.EUR)
          currencyValue = t("currency_short_eur");
        if (Store.finance.currency === CurrencyEnum.USD)
          currencyValue = `${t("currency_short_usd")}.`;
        values.unshift(
          `<b>${t("saved")}!</b> <i>+ ${
            Store.finance.value
          } ${currencyValue}</i>`
        );
        await ctx.replyWithHTML(values.join("\n"));
      } catch (e) {
        console.log(e);
        await ctx.reply(`🚫 ${t("err_money_box_put_req")}`);
      }
    } else await ctx.reply(t("money_value_too_big"));
  } else await ctx.reply(t("typed_add_cost_incorrect"));
};

export default financeInput;

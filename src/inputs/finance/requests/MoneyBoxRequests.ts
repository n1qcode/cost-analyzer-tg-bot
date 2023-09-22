import { financeService } from "../../../services/finance.service";
import Store from "../../../store/Store";
import { financeAppearanceShaper } from "../../../commands/finance/utils/helpers";
import { t } from "../../../i18n";
import { CurrencyEnum } from "../../../utils/enums";
import { ContextExt } from "../../../typings/utility.typings";

export default class MoneyBoxRequests {
  static async put(ctx: ContextExt) {
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
        `<b>${t("saved")}!</b> <i>+ ${Store.finance.value} ${currencyValue}</i>`
      );
      await ctx.replyWithHTML(values.join("\n"));
    } catch (e) {
      console.log(e);
      await ctx.reply(`🚫 ${t("err_money_box_put_req")}`);
    }
  }

  static async take(ctx: ContextExt) {
    try {
      const response = await financeService
        .takeMoneyFromMoneyBox({
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
        `<b>${t("has_taken")}!</b> <i>- ${
          Store.finance.value
        } ${currencyValue}</i>`
      );
      await ctx.replyWithHTML(values.join("\n"));
    } catch (e) {
      console.log(e);
      const isZero = String(e).split(" ").at(-1) === "ZERO";
      if (isZero) {
        await ctx.reply(
          `🚫 ${t("err_money_box_take_req")}\n${t("take_zero_money_balance")}`
        );
      } else await ctx.reply(`🚫 ${t("err_money_box_take_req")}`);
    }
  }
}

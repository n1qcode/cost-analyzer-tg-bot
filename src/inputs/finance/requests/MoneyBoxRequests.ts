import { financeService } from "../../../services/finance.service";
import Store from "../../../store/Store";
import { financeAppearanceShaper } from "../../../commands/finance/utils/helpers";
import { t } from "../../../i18n";
import { CurrencyEnum } from "../../../utils/enums";
import { ContextExt } from "../../../typings/utility.typings";
import sumSpaceDivider from "../../../utils/sumSpaceDivider";
import { SPACE } from "../../../utils/constants";

export default class MoneyBoxRequests {
  static async put(ctx: ContextExt) {
    const sumValue = Number(
      Store.finance.value.includes(",")
        ? Store.finance.value.split(",").join(".")
        : Store.finance.value
    );
    try {
      const response = await financeService
        .putMoneyToMoneyBox({
          sum: sumValue,
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
        `<b>${t("saved")}!</b>  <i>+ ${sumSpaceDivider(
          String(sumValue)
        )}${SPACE}${currencyValue}</i>`
      );
      await ctx.replyWithHTML(values.join("\n"));
    } catch (e) {
      console.log(e);
      const lastWord = String(e).split(" ").at(-1);
      const isOverflow = lastWord === "overflow";
      if (isOverflow) {
        await ctx.reply(
          `🚫 ${t("err_money_box_put_req")}\n${t("err_money_value_too_big")}`
        );
      } else await ctx.reply(`🚫 ${t("err_money_box_put_req")}`);
    }
  }

  static async take(ctx: ContextExt) {
    const sumValue = Number(
      Store.finance.value.includes(",")
        ? Store.finance.value.split(",").join(".")
        : Store.finance.value
    );
    try {
      const response = await financeService
        .takeMoneyFromMoneyBox({
          sum: sumValue,
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
        `<b>${t("has_taken")}!</b>  <i>- ${sumSpaceDivider(
          String(sumValue)
        )}${SPACE}${currencyValue}</i>`
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

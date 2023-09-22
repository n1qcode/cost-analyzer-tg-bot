import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { CURRENCY_REGEXP } from "../utils/constants";
import Store from "../../../store/Store";
import { CurrencyEnum } from "../../../utils/enums";
import { usersService } from "../../../services/users.service";

import { currencyRefresher } from "./currency.helpers";

const currency = (bot: Telegraf<IBotContext>) => {
  bot.hears(CURRENCY_REGEXP, (ctx) => {
    const userId = ctx.message?.from.id;
    Store.resetStore();
    ctx.reply(`<b>${t("select_currency")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [Markup.button.callback(t(CurrencyEnum.RUB), CurrencyEnum.RUB)],
        [Markup.button.callback(t(CurrencyEnum.USD), CurrencyEnum.USD)],
        [Markup.button.callback(t(CurrencyEnum.EUR), CurrencyEnum.EUR)],
      ]),
    });
    bot.action(CurrencyEnum.RUB, async (ctx) => {
      Store.finance.currency = CurrencyEnum.RUB;
      await usersService.setUserCurrency({
        userId,
        currency: CurrencyEnum.RUB,
      });
      await currencyRefresher(ctx);
    });
    bot.action(CurrencyEnum.USD, async (ctx) => {
      Store.finance.currency = CurrencyEnum.USD;
      await usersService.setUserCurrency({
        userId,
        currency: CurrencyEnum.USD,
      });
      await currencyRefresher(ctx);
    });
    bot.action(CurrencyEnum.EUR, async (ctx) => {
      Store.finance.currency = CurrencyEnum.EUR;
      await usersService.setUserCurrency({
        userId,
        currency: CurrencyEnum.EUR,
      });
      await currencyRefresher(ctx);
    });
  });
};

export default currency;

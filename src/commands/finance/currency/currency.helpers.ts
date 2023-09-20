import { Context, Markup } from "telegraf";

import { t } from "../../../i18n";
import { MAIN_BUTTONS } from "../utils/constants";
import Store from "../../../store/store";

export const currencyRefresher = async (ctx: Context) => {
  await ctx.editMessageText(`<b>${t("currency_changed")}!</b>`, {
    parse_mode: "HTML",
  });
  MAIN_BUTTONS.currency = `🪙 ${t("current_currency_label")} (${t(
    Store.finance.currency
  )})`;

  await ctx.reply(
    `${t("current_currency_label")}: ${t(Store.finance.currency)}`,
    Markup.keyboard([
      [MAIN_BUTTONS.money_box],
      [MAIN_BUTTONS.pocket_money],
      [MAIN_BUTTONS.currency],
    ]).resize()
  );
};

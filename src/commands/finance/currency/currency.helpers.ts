import { Context, Markup } from "telegraf";

import { t } from "../../../i18n";
import { MAIN_BUTTONS } from "../utils/constants";
import Stores from "../../../store/Store";

export const currencyRefresher = async (ctx: Context) => {
  if (!ctx.from) {
    await ctx?.reply("🚫 Error: userId is not specified");
    return;
  }
  const Store = Stores.get(ctx.from.id);
  await ctx.editMessageText(`<b>${t("currency_changed")}!</b>`, {
    parse_mode: "HTML",
  });

  await ctx.reply(
    `${t("current_currency_label")}: ${t(Store.finance.currency)}`,
    Markup.keyboard([
      [MAIN_BUTTONS.money_box],
      [MAIN_BUTTONS.pocket_money],
      [MAIN_BUTTONS.currency(ctx.from.id)],
    ]).resize()
  );
};

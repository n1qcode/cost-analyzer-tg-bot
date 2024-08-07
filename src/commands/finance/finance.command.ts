import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../context/context.interface";
import { t } from "../../i18n";
import accessProtector from "../../utils/accessProtector";
import { Command } from "../command.class";
import { usersService } from "../../services/users.service";
import { LastPlacesEnum } from "../../utils/enums";
import Stores from "../../store/Store";

import { MAIN_BUTTONS } from "./utils/constants";
import moneyBox from "./moneyBox/moneyBox";
import currency from "./currency/currency";
import pocketMoney from "./pocketMoney/pocketMoney";

export class FinanceCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.command("finance", async (ctx) => {
      if (!accessProtector(ctx)) return;
      const Store = Stores.get(ctx.from.id);
      await usersService.setUserFinanceInfo({
        userId: ctx.message.from.id,
        lastPlace: LastPlacesEnum.FINANCE,
        currency: Store.finance.currency,
      });
      return await ctx.replyWithHTML(
        `<b>${t("finance_menu")}!</b>`,
        Markup.keyboard([
          [MAIN_BUTTONS.money_box],
          [MAIN_BUTTONS.pocket_money],
          [MAIN_BUTTONS.currency(ctx.from.id)],
        ]).resize()
      );
    });
    this.bot.command("finance_help", (ctx) => {
      if (!accessProtector(ctx)) return;
      return ctx.replyWithHTML(
        `<b>${t("finance_help")}</b>\n${t("finance_help_info")}`
      );
    });
    moneyBox(this.bot);
    pocketMoney(this.bot);
    currency(this.bot);
  }
}

import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../context/context.interface";
import { t } from "../../i18n";
import accessProtector from "../../utils/accessProtector";
import { Command } from "../command.class";

import { MAIN_BUTTONS } from "./utils/constants";
import moneyBox from "./moneyBox/moneyBox";

export class FinanceCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.command("finance", async (ctx) => {
      if (!accessProtector(ctx)) return;
      return await ctx.replyWithHTML(
        `<b>${t("finance_menu")}!</b>`,
        Markup.keyboard([
          [MAIN_BUTTONS.money_box],
          [MAIN_BUTTONS.pocket_money],
        ]).resize()
      );
    });
    this.bot.hears(MAIN_BUTTONS.money_box, async (ctx) => {
      await moneyBox(this.bot, ctx);
    });
  }
}

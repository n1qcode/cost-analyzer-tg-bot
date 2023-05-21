import { Telegraf } from "telegraf";

import { IBotContext } from "../context/context.interface";
import { t } from "../i18n";
import accessProtector from "../utils/accessProtector";

import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.start((ctx) => {
      if (!accessProtector(ctx)) return;
      ctx.reply(t("start"));
    });
  }
}

import { Telegraf } from "telegraf";

import { IBotContext } from "../context/context.interface";

import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.start((ctx) =>
      ctx.reply("Welcome to the Cost Analyzer Bot! Test after change!")
    );
  }
}

import { Telegraf } from "telegraf";

import { IBotContext } from "../context/context.interface";
import { commands } from "../utils/constants";

import { Command } from "./command.class";

export class HelpCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.help((ctx) => ctx.reply(commands));
  }
}

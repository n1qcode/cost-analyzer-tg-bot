import { Telegraf } from "telegraf";
import config from "config";

import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { HelpCommand } from "./commands/help.command";
import { CostCommand } from "./commands/cost.command";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];

  constructor(private readonly configBot: string) {
    this.bot = new Telegraf<IBotContext>(configBot);
  }

  init() {
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new CostCommand(this.bot),
    ];
    this.commands.forEach((command) => command.handle());

    this.bot.launch();
  }

  stop(event: string) {
    this.bot.stop(event);
  }
}

const bot = new Bot(config.get("TELEGRAM_TOKEN"));
bot.init();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

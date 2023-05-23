import { Telegraf } from "telegraf";
import config from "config";
import { message } from "telegraf/filters";

import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { HelpCommand } from "./commands/help.command";
import { CostCommand } from "./commands/cost/cost.command";
import { Store } from "./store/store";
import { CostActionEnum } from "./commands/cost/cost.enums";
import addToCostCategoryInput from "./inputs/cost/addToCostCategoryInput";
import seeChosenMonthCostInput from "./inputs/cost/seeChosenMonthCostInput";
import addNewCostCategoryInput from "./inputs/cost/addNewCostCategoryInput";

export const globalStore = new Store();

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

  hear() {
    this.bot.on(message("text"), async (ctx) => {
      if (globalStore.activeInputAction[CostActionEnum.ADD_COST])
        await addToCostCategoryInput(ctx);
      if (globalStore.activeInputAction[CostActionEnum.CHOOSE_MONTH])
        await seeChosenMonthCostInput(ctx);
      if (globalStore.activeInputAction[CostActionEnum.ADD_COST_CAT])
        await addNewCostCategoryInput(ctx);
    });
  }

  stop(event: string) {
    this.bot.stop(event);
  }
}

const bot = new Bot(config.get("TELEGRAM_TOKEN"));
bot.init();
bot.hear();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

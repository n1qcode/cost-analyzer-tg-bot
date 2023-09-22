import { Telegraf } from "telegraf";
import config from "config";
import { message } from "telegraf/filters";

import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { HelpCommand } from "./commands/help.command";
import { CostCommand } from "./commands/cost/cost.command";
import { StatisticsCommand } from "./commands/statistics/statistics.command";
import { FinanceCommand } from "./commands/finance/finance.command";
import Store from "./store/Store";
import { CostActionEnum } from "./commands/cost/cost.enums";
import addToCostCategoryInput from "./inputs/cost/addToCostCategoryInput";
import seeChosenMonthCostInput from "./inputs/cost/seeChosenMonthCostInput";
import createCostCategoryInput from "./inputs/cost/createCostCategoryInput";
import changeTranslationCostCatInput from "./inputs/cost/changeTranslationCostCatInput";
import Informer from "./utils/Informer/Informer";
import { FINANCE_INPUT_ACTIONS } from "./commands/finance/utils/enums";
import financeInput from "./inputs/finance/financeInput";
import { lastPlaceInspector } from "./utils/lastPlaceInspector";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];

  constructor(private readonly configBot: string) {
    this.bot = new Telegraf<IBotContext>(configBot);
  }

  async init() {
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new CostCommand(this.bot),
      new StatisticsCommand(this.bot),
      new FinanceCommand(this.bot),
    ];
    this.commands.forEach((command) => command.handle());
    await lastPlaceInspector(this.bot);
    await this.bot.launch();
    Informer.launch(this.bot);
  }

  hear() {
    this.bot.on(message("text"), async (ctx) => {
      if (Store.activeInputAction[CostActionEnum.ADD_COST])
        await addToCostCategoryInput(ctx);
      if (Store.activeInputAction[CostActionEnum.CHOOSE_MONTH])
        await seeChosenMonthCostInput(ctx);
      if (Store.activeInputAction[CostActionEnum.ADD_COST_CAT])
        await createCostCategoryInput(ctx);
      if (Store.activeInputAction[CostActionEnum.TRANSLATE_COST])
        await changeTranslationCostCatInput(ctx);
      if (Store.activeInputAction[FINANCE_INPUT_ACTIONS.FINANCE])
        await financeInput(ctx);
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

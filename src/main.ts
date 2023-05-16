import { Telegraf } from "telegraf";
import config from 'config'
import { IBotContext } from "./context/context.interface";

class Bot {
  bot: Telegraf<IBotContext>;

  constructor(private readonly configBot: string) {
    this.bot = new Telegraf<IBotContext>(configBot);
  }

  init() {
    this.bot.launch();
    this.bot.start((ctx) => ctx.reply('Welcome to the Cost Analyzer Bot'));
  }

  stop(event: string) {
    this.bot.stop(event)
  }

}

const bot = new Bot(config.get('TELEGRAM_TOKEN'));
bot.init();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
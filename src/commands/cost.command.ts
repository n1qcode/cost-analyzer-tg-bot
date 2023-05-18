import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../context/context.interface";
import { costService } from "../services/cost.service";
import { text1, text2, text3 } from "../utils/constants";

import { Command } from "./command.class";

export class CostCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.command("cost", async (ctx) => {
      return await ctx.reply(
        "Custom buttons keyboard",
        Markup.keyboard([
          ["💰 Add cost", "😰 See cost"], // Row1 with 2 buttons
          ["😎 Add cost category"], // Row3 with 3 buttons
        ])
          .oneTime()
          .resize()
      );
    });

    this.bot.hears("💰 Add cost", (ctx) => ctx.reply("Click Add cost!"));
    this.bot.hears("😰 See cost", async (ctx) => {
      await ctx.reply("Let's see cost!");
      await ctx.reply("Wait response...");
      await ctx.replyWithHTML(text1);
      await ctx.replyWithHTML(text2);
      await ctx.replyWithHTML(text3);
      const cost = await costService.getDayCostOfUser(2, "2023-05-18");
      ctx.reply(`Cost: ${JSON.stringify(cost.data)}`);
    });
    this.bot.hears("😎 Add cost category", (ctx) =>
      ctx.reply("Click Add cost category!")
    );
  }
}

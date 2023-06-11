import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../context/context.interface";
import { t } from "../../i18n";
import accessProtector from "../../utils/accessProtector";
import { Command } from "../command.class";
import { costService } from "../../services/cost.service";
import Calculator from "../../utils/Calculator/Calculator";

import { MAIN_BUTTONS } from "./utils/constants";

export class StatisticsCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.command("statistics", async (ctx) => {
      if (!accessProtector(ctx)) return;
      return await ctx.replyWithHTML(
        `<b>${t("statistics_menu")}!</b>`,
        Markup.keyboard([[MAIN_BUTTONS.average_cost_per_day]])
          .oneTime()
          .resize()
      );
    });
    this.bot.hears(MAIN_BUTTONS.average_cost_per_day, async (ctx) => {
      const costDays = await costService.getAllCost().then((res) => res.data);
      let totalCost = 0;

      for (const dayCost of costDays) {
        totalCost += Object.entries(dayCost).reduce((accum, [key, values]) => {
          if (/cat/.test(key)) return (accum += +values);
          return accum;
        }, 0);
      }

      const avSpendPerDay = Calculator.roundHalfUp(totalCost / costDays.length);

      await ctx.replyWithHTML(
        `<i>${t(
          "statistics_av_cost_per_day"
        )}</i>: <u><b>${avSpendPerDay}</b></u> ${t("currency")}.`
      );
    });
  }
}

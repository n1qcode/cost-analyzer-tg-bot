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
        Markup.keyboard([[MAIN_BUTTONS.average_cost_per_day]]).resize()
      );
    });
    this.bot.hears(MAIN_BUTTONS.average_cost_per_day, async (ctx) => {
      const costDays = await costService.getAllCost().then((res) =>
        res.data.sort((a, b) => {
          if (a.cost_date < b.cost_date) return -1;
          if (a.cost_date > b.cost_date) return 1;
          return 0;
        })
      );
      let totalCost = 0;

      const dateOptions = {
        timeZone: "Europe/Moscow",
      } as const;
      const beginDate = new Date(costDays[0].cost_date).getTime();
      const currDate = new Date().toLocaleDateString("ru-RU", dateOptions);
      const currDateFormatted = new Date(
        currDate.split(".").reverse().join(".")
      ).getTime();
      const diff = currDateFormatted - beginDate;
      const costLength = Math.ceil(diff / (1000 * 3600 * 24)) + 1;

      for (const dayCost of costDays) {
        totalCost += Object.entries(dayCost).reduce((accum, [key, values]) => {
          if (/cat/.test(key)) return (accum += +values);
          return accum;
        }, 0);
      }

      const avSpendPerDay = Calculator.roundHalfUp(totalCost / costLength);

      await ctx.replyWithHTML(
        `<i>${t(
          "statistics_av_cost_per_day"
        )}</i>: <u><b>${avSpendPerDay}</b></u> ${t("currency")}.`
      );
    });
  }
}
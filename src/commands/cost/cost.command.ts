import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../context/context.interface";
import { t } from "../../i18n";
import accessProtector from "../../utils/accessProtector";
import { Command } from "../command.class";

import addCost from "./addCost/addCost";
import seeCost from "./seeCost/seeCost";
import createCostCat from "./createCostCat/createCostCat";
import { MAIN_BUTTONS } from "./utils/constants";
import translateCostCat from "./translateCostCat/translateCostCat";

export class CostCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.command("cost", async (ctx) => {
      if (!accessProtector(ctx)) return;
      return await ctx.reply(
        t("spend_carefully"),
        Markup.keyboard([
          [MAIN_BUTTONS.add_cost, MAIN_BUTTONS.see_cost],
          [MAIN_BUTTONS.add_cost_cat],
          [MAIN_BUTTONS.translate_cost_cat],
        ]).resize()
      );
    });
    this.bot.command("add_cost_help", (ctx) => {
      if (!accessProtector(ctx)) return;
      return ctx.replyWithHTML(
        `<b>${t("add_to_cost")}</b>\n${t("add_to_cost_help_info")}`
      );
    });

    addCost(this.bot);
    seeCost(this.bot);
    createCostCat(this.bot);
    translateCostCat(this.bot);
  }
}

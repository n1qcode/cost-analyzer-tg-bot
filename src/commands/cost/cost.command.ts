import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../context/context.interface";
import { t } from "../../i18n";
import accessProtector from "../../utils/accessProtector";
import { Command } from "../command.class";

import monthCost from "./seeCost/monthCost";
import todayCost from "./seeCost/todayCost";
import addCost from "./addCost/addCost";
import seeCost from "./seeCost/seeCost";
import addCostCat from "./addCostCat/addCostCat";
import { ICostCommandLocalState } from "./cost.typings";
import { MAIN_BUTTONS } from "./utils/constants";

export class CostCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }
  private costState: ICostCommandLocalState = {
    costCategories: [],
    chosenCategory: "",
    isCatAdd: false,
  };

  handle() {
    this.bot.command("cost", async (ctx) => {
      if (!accessProtector(ctx)) return;
      return await ctx.reply(
        t("spend_carefully"),
        Markup.keyboard([
          [MAIN_BUTTONS.add_cost, MAIN_BUTTONS.see_cost],
          [MAIN_BUTTONS.add_cost_cat],
        ])
          .oneTime()
          .resize()
      );
    });

    addCost(this.bot, this.costState);
    seeCost(this.bot, this.costState);
    addCostCat(this.bot, this.costState);
  }
}

import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../context/context.interface";
import { t } from "../../i18n";
import accessProtector from "../../utils/accessProtector";
import { Command } from "../command.class";
import Stores from "../../store/Store";
import { usersService } from "../../services/users.service";
import { LastPlacesEnum } from "../../utils/enums";

import { MAIN_BUTTONS } from "./utils/constants";
import addCost from "./addCost/addCost";
import seeCost from "./seeCost/seeCost";
import createCostCat from "./createCostCat/createCostCat";
import changeTranslationCostCat from "./changeTranslationCostCat/changeTranslationCostCat";
import CostAssistant from "./utils/costAssistent";

export class CostCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.command("cost", async (ctx) => {
      if (!accessProtector(ctx)) return;
      await usersService.setLastUserPlace({
        userId: ctx.message.from.id,
        lastPlace: LastPlacesEnum.COST,
      });
      return await ctx.reply(
        t("spend_carefully"),
        Markup.keyboard([
          [MAIN_BUTTONS.add_cost, MAIN_BUTTONS.see_cost],
          [MAIN_BUTTONS.create_cost_cat],
          [MAIN_BUTTONS.change_translation_cost_cat],
        ]).resize()
      );
    });
    this.bot.command("cost_help", (ctx) => {
      if (!accessProtector(ctx)) return;
      return ctx.replyWithHTML(
        `<b>${t("add_to_cost")}</b>\n${t("add_to_cost_help_info")}`
      );
    });

    const mainButtonsLabels = Object.values(MAIN_BUTTONS).map(
      (btn) => btn.split(" ")[1]
    );
    const mainButtonsRegExp = new RegExp(mainButtonsLabels.join("|"), "i");

    this.bot.hears(mainButtonsRegExp, async (ctx) => {
      const Store = Stores.get(ctx.from.id);
      Store.resetStore();

      switch (ctx.message.text) {
        case MAIN_BUTTONS.add_cost:
          await CostAssistant.getCostCategories(ctx);
          await CostAssistant.getFrequency(ctx);
          await CostAssistant.getTranslation(ctx);
          await addCost(this.bot, ctx);
          break;
        case MAIN_BUTTONS.see_cost:
          await CostAssistant.getTranslation(ctx);
          await seeCost(this.bot, ctx);
          break;
        case MAIN_BUTTONS.create_cost_cat:
          await createCostCat(this.bot, ctx);
          break;
        case MAIN_BUTTONS.change_translation_cost_cat:
          await CostAssistant.getCostCategories(ctx);
          await CostAssistant.getTranslation(ctx);
          await changeTranslationCostCat(this.bot, ctx);
          break;
        default:
          break;
      }
    });
  }
}

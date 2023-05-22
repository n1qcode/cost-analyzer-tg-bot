import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../../context/context.interface";
import { t } from "../../../../i18n";
import { IActiveInputAction } from "../../cost.typings";

import monthCostShaper from "./monthCost.helpers";

const monthCost = (
  bot: Telegraf<IBotContext>,
  activeInputAction: IActiveInputAction
) => {
  bot.action("month_cost", async (ctx) => {
    ctx.editMessageText(`<b>${t("see_cost_month")}:</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [Markup.button.callback(t("cost_curr_month"), "cost_curr_month")],
        [Markup.button.callback(t("cost_last_month"), "cost_last_month")],
        [Markup.button.callback(t("cost_choose_month"), "cost_choose_month")],
      ]),
    });

    monthCostShaper(bot, "cost_curr_month");
    monthCostShaper(bot, "cost_last_month");
    monthCostShaper(bot, "cost_choose_month", activeInputAction);
  });
};

export default monthCost;

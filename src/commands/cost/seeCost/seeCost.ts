import { Markup, Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { IActiveInputAction } from "../cost.typings";

import todayCost from "./todayCost";
import monthCost from "./monthCost/monthCost";

const seeCost = (
  bot: Telegraf<IBotContext>,
  activeInputAction: IActiveInputAction
) => {
  bot.hears(MAIN_BUTTONS.see_cost, async (ctx) => {
    ctx.reply(`<b>${t("choose_cat_to_see")}</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [Markup.button.callback(t("today_cost"), "today_cost")],
        [Markup.button.callback(t("month_cost"), "month_cost")],
        [Markup.button.callback(t("season_cost"), "season_cost")],
        [Markup.button.callback(t("year_cost"), "year_cost")],
        [Markup.button.callback(t("choose_date_cost"), "choose_date_cost")],
        [Markup.button.callback(t("choose_period_cost"), "choose_period_cost")],
      ]),
    });
  });
  todayCost(bot);
  monthCost(bot, activeInputAction);
};

export default seeCost;

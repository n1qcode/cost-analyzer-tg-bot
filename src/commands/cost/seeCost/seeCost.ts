import { Context, Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { globalStore } from "../../../main";

import todayCost from "./todayCost";
import monthCost from "./monthCost/monthCost";

const seeCost = async (bot: Telegraf<IBotContext>, ctx: Context) => {
  globalStore.resetStore();
  ctx.reply(`<b>${t("choose_cat_to_see")}</b>`, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      [Markup.button.callback(t("today_cost"), "today_cost")],
      [Markup.button.callback(t("month_cost"), "month_cost")],
      // [Markup.button.callback(t("season_cost"), "season_cost")], // TODO
      // [Markup.button.callback(t("year_cost"), "year_cost")], // TODO
      // [Markup.button.callback(t("choose_date_cost"), "choose_date_cost")], // TODO
      // [Markup.button.callback(t("choose_period_cost"), "choose_period_cost")], // TODO
    ]),
  });
  todayCost(bot);
  monthCost(bot);
};

export default seeCost;

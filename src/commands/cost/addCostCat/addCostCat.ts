import { Telegraf } from "telegraf";

import { MAIN_BUTTONS } from "../utils/constants";
import { IBotContext } from "../../../context/context.interface";

const addCostCat = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.add_cost_cat, (ctx) =>
    ctx.reply("Click Add cost category!")
  );
};

export default addCostCat;

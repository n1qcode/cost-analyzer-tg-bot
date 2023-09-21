import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
// import { t } from "../../../i18n";
import { MONEY_BOX_BUTTONS } from "../utils/constants";

const takeMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.take, async (ctx) => {
    return null;
  });
};

export default takeMoneyToMoneyBox;
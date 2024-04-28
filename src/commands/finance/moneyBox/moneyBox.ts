import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { MAIN_BUTTONS, MONEY_BOX_BUTTONS } from "../utils/constants";
import Stores from "../../../store/Store";

import getInfoOfMoneyBox from "./getInfoOfMoneyBox";
import putMoneyToMoneyBox from "./putMoneyToMoneyBox";
import takeMoneyToMoneyBox from "./takeMoneyToMoneyBox";

const moneyBox = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.money_box, (ctx) => {
    const Store = Stores.get(ctx.from.id);
    Store.resetStore();
    ctx.reply(`💰 <b>${t("money_box")}</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback(
            MONEY_BOX_BUTTONS.get_info,
            MONEY_BOX_BUTTONS.get_info
          ),
        ],
        [Markup.button.callback(MONEY_BOX_BUTTONS.put, MONEY_BOX_BUTTONS.put)],
        [
          Markup.button.callback(
            MONEY_BOX_BUTTONS.take,
            MONEY_BOX_BUTTONS.take
          ),
        ],
      ]),
    });
    getInfoOfMoneyBox(bot);
    putMoneyToMoneyBox(bot);
    takeMoneyToMoneyBox(bot);
  });
};

export default moneyBox;

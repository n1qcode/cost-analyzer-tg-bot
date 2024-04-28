import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { MAIN_BUTTONS, POCKET_MONEY_BUTTONS } from "../utils/constants";
import Stores from "../../../store/Store";

import getInfoOfPocketMoney from "./getInfoOfPocketMoney";
import putMoneyToPocketMoney from "./putMoneyToPocketMoney";
import takeMoneyToPocketMoney from "./takeMoneyToPocketMoney";

const pocketMoney = (bot: Telegraf<IBotContext>) => {
  bot.hears(MAIN_BUTTONS.pocket_money, (ctx) => {
    const Store = Stores.get(ctx.from.id);
    Store.resetStore();
    ctx.reply(`💵 🫰 <b>${t("pocket_money")}</b>`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback(
            POCKET_MONEY_BUTTONS.get_info,
            POCKET_MONEY_BUTTONS.get_info
          ),
        ],
        [
          Markup.button.callback(
            POCKET_MONEY_BUTTONS.put,
            POCKET_MONEY_BUTTONS.put
          ),
        ],
        [
          Markup.button.callback(
            POCKET_MONEY_BUTTONS.take,
            POCKET_MONEY_BUTTONS.take
          ),
        ],
      ]),
    });
    getInfoOfPocketMoney(bot);
    putMoneyToPocketMoney(bot);
    takeMoneyToPocketMoney(bot);
  });
};

export default pocketMoney;

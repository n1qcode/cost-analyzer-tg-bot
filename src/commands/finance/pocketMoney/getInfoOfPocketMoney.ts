import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { POCKET_MONEY_BUTTONS } from "../utils/constants";
import { financeService } from "../../../services/finance.service";
import {
  financeAppearanceShaper,
  isEmptyFinanceInspector,
} from "../utils/helpers";

const getInfoOfPocketMoney = (bot: Telegraf<IBotContext>) => {
  bot.action(POCKET_MONEY_BUTTONS.get_info, async (ctx) => {
    try {
      const response = await financeService
        .getInfoOfPocketMoney()
        .then((res) => res.data);
      const { payload, error } = response;

      const isEmptyPocketMoneyBox = isEmptyFinanceInspector(payload);

      if (error) throw new Error(error);

      if (!isEmptyPocketMoneyBox) {
        const values = financeAppearanceShaper(payload, true);
        await ctx.editMessageText(values.join("\n"), {
          parse_mode: "HTML",
        });
      } else ctx.editMessageText(`${t("pocket_money_empty")} 😱`);
    } catch (e) {
      console.log(e);
      await ctx.editMessageText(`🚫 ${t("err_pocket_money_look_req")}`);
    }
  });
};

export default getInfoOfPocketMoney;

import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import { financeService } from "../../../services/finance.service";
import {
  financeAppearanceShaper,
  isEmptyFinanceInspector,
} from "../utils/helpers";

const getInfoOfMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.get_info, async (ctx) => {
    try {
      const response = await financeService
        .getInfoOfMoneyBox()
        .then((res) => res.data);
      const { payload, error } = response;

      const isEmptyMoneyBox = isEmptyFinanceInspector(payload);

      if (error) throw new Error(error);

      if (!isEmptyMoneyBox) {
        const values = financeAppearanceShaper(payload);
        await ctx.editMessageText(values.join("\n"), {
          parse_mode: "HTML",
        });
      } else ctx.editMessageText(`${t("money_box_empty")} 😱`);
    } catch (e) {
      console.log(e);
      await ctx.editMessageText(`🚫 ${t("err_money_box_look_req")}`);
    }
  });
};

export default getInfoOfMoneyBox;

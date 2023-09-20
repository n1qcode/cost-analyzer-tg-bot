import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { MONEY_BOX_BUTTONS } from "../utils/constants";
import { financeService } from "../../../services/finance.service";
import {
  financeAppearanceShaper,
  isEmptyFinanceInspector,
} from "../utils/helpers";
import { FINANCE_INPUT_ACTIONS } from "../utils/enums";
import Store from "../../../store/store";

const putMoneyToMoneyBox = (bot: Telegraf<IBotContext>) => {
  bot.action(MONEY_BOX_BUTTONS.put, async (ctx) => {
    if (!Store.seeMonthCost.isEnter) {
      try {
        const response = await financeService
          .putMoneyToMoneyBox({
            sum: +Store.finance.value,
            currency: Store.finance.currency,
          })
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
    } else {
      Store.activeInputAction[FINANCE_INPUT_ACTIONS.FINANCE] = true;
      await ctx.editMessageText(`${t("type_sum")}:`);
    }
  });
};

export default putMoneyToMoneyBox;

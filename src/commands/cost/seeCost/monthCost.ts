import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { costService } from "../../../services/cost.service";
import translator from "../../../utils/translator";

const monthCost = (bot: Telegraf<IBotContext>) => {
  bot.action("month_cost", async (ctx) => {
    try {
      const [year, month] = new Date().toISOString().split("T")[0].split("-");

      const response: Array<object> = await costService
        .getMonthCost(year, month)
        .then((res) => res.data);

      if (response.length) {
        const columnText: string[] = [`<u><b>${t("month_cost")}</b></u>:`];
        let amount = 0;
        const totalCost = response.reduce<Record<string, number>>(
          (accum, curr) => {
            for (const [costKey, costValue] of Object.entries(curr)) {
              if (/cat/.test(String(costKey))) {
                if (!(String(costKey) in accum))
                  accum[String(costKey)] = +costValue;
                else accum[String(costKey)] += +costValue;
              }
            }
            return accum;
          },
          {}
        );

        for (const [costKey, costValue] of Object.entries(totalCost)) {
          if (/cat/.test(costKey)) {
            columnText.push(
              `<code>${translator(costKey)}: ${costValue} ${t(
                "currency"
              )}.</code>`
            );
            amount += costValue;
          }
        }

        columnText.push(
          `<i>${t("total_spent")}</i>: <u><b>${amount.toFixed(2)}</b></u> ${t(
            "currency"
          )}.`
        );

        await ctx.editMessageText(columnText.join("\n"), {
          parse_mode: "HTML",
        });
      } else ctx.editMessageText(t("no_cost_month"));
    } catch (e) {
      await ctx.editMessageText(`${t("err_see_cost_req")}: ${e}`);
    }
  });
};

export default monthCost;

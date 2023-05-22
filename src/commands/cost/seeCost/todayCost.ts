import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { costService } from "../../../services/cost.service";
import translator from "../../../utils/translator";

const todayCost = (bot: Telegraf<IBotContext>) => {
  bot.action("today_cost", async (ctx) => {
    try {
      const date = new Date().toISOString().split("T")[0];
      const response: Array<object> = await costService
        .getDayCost(date)
        .then((res) => res.data);

      if (response.length) {
        const columnText: string[] = [`<u><b>${t("today_cost")}</b></u>:`];
        let amount = 0;

        for (const [costKey, costValue] of Object.entries(response[0])) {
          if (/cat/.test(costKey)) {
            columnText.push(
              `<code>${translator(costKey)}: ${costValue} ${t(
                "currency"
              )}.</code>`
            );
            amount += Number(costValue) as number;
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
      } else ctx.editMessageText(t("no_cost_today"));
    } catch (e) {
      await ctx.editMessageText(`${t("err_see_cost_req")}: ${e}`);
    }
  });
};

export default todayCost;

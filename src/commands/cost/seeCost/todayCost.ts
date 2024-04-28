import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { costService } from "../../../services/cost.service";
import { CostTimeEnum } from "../../../utils/enums";

import costAppearanceShaper from "./utils/costAppearanceShaper";

const todayCost = (bot: Telegraf<IBotContext>) => {
  bot.action("today_cost", async (ctx) => {
    try {
      const dateOptions = {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      } as const;
      const date = new Date()
        .toLocaleDateString("ru-RU", dateOptions)
        .split(".")
        .reverse()
        .join("-");
      const response = await costService
        .getDayCost(date)
        .then((res) => res.data);

      const { payload, error } = response;

      if (error) throw new Error(error);

      if (payload?.length) {
        if (!ctx.from) {
          await ctx?.reply("🚫 Error: userId is not specified");
          return;
        }
        const costValues = costAppearanceShaper(
          payload,
          CostTimeEnum.DAY,
          ctx.from.id
        );
        costValues.unshift(`<u><b>${t("today_cost")}</b></u>:`);
        await ctx.editMessageText(costValues.join("\n"), {
          parse_mode: "HTML",
        });
      } else ctx.editMessageText(t("no_cost_today"));
    } catch (e) {
      console.log(e);
      await ctx.editMessageText(`🚫 ${t("err_see_cost_req")}`);
    }
  });
};

export default todayCost;

import { Telegraf } from "telegraf";

import { IBotContext } from "../../../context/context.interface";
import { t } from "../../../i18n";
import { costService } from "../../../services/cost.service";
import { globalStore } from "../../../main";
import costAppearanceShaper from "../../../utils/costAppearanceShaper";
import { CostTimeEnum } from "../../../utils/enums";

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
      const response: Array<object> = await costService
        .getDayCost(date)
        .then((res) => res.data);
      globalStore.costState.translator = await costService
        .getTranslationCostCategory()
        .then((res) => res.data);

      if (response.length) {
        const costValues = costAppearanceShaper(response, CostTimeEnum.DAY);
        costValues.unshift(`<u><b>${t("today_cost")}</b></u>:`);
        await ctx.editMessageText(costValues.join("\n"), {
          parse_mode: "HTML",
        });
      } else ctx.editMessageText(t("no_cost_today"));
    } catch (e) {
      await ctx.editMessageText(`${t("err_see_cost_req")}: ${e}`);
    }
  });
};

export default todayCost;

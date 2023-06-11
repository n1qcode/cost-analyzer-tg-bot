import { Telegraf } from "telegraf";

import { costService } from "../../../../services/cost.service";
import { t } from "../../../../i18n";
import { IBotContext } from "../../../../context/context.interface";
import { CostActionEnum } from "../../cost.enums";
import { globalStore } from "../../../../main";
import costAppearanceShaper from "../../../../utils/costAppearanceShaper";
import { CostTimeEnum } from "../../../../utils/enums";

const _monthCostRequest = async (year: string, month: string) => {
  const response: Array<object> = await costService
    .getMonthCost(year, month)
    .then((res) => res.data);
  globalStore.costState.translator = await costService
    .getTranslationCostCategory()
    .then((res) => res.data);

  let costValues: string[] = [];

  if (response.length)
    costValues = costAppearanceShaper(response, CostTimeEnum.MONTH);

  return costValues;
};

export const monthCostExecutor = async () => {
  const ctx = globalStore.seeMonthCost.ctx;
  try {
    const costValues = await _monthCostRequest(
      globalStore.seeMonthCost.year,
      globalStore.seeMonthCost.month
    );
    globalStore.seeMonthCost.costValues.push(...costValues);

    globalStore.seeMonthCost.costValues.unshift(
      `${
        globalStore.seeMonthCost.isEnter
          ? `<b><u>${t("typed_month_cost")}</u>:</b> <i>${
              globalStore.seeMonthCost.year
            }.${globalStore.seeMonthCost.month}</i>`
          : t(
              globalStore.seeMonthCost.isLast
                ? "last_month_cost"
                : "curr_month_cost"
            )
      }:`
    );

    if (globalStore.seeMonthCost.costValues.length > 1) {
      globalStore.seeMonthCost.isEnter
        ? await ctx?.reply(globalStore.seeMonthCost.costValues.join("\n"), {
            parse_mode: "HTML",
          })
        : await ctx?.editMessageText(
            globalStore.seeMonthCost.costValues.join("\n"),
            {
              parse_mode: "HTML",
            }
          );
    } else
      globalStore.seeMonthCost.isEnter
        ? await ctx?.reply(
            !globalStore.seeMonthCost.isLast
              ? t("no_cost_month")
              : t("no_cost_last_month")
          )
        : await ctx?.editMessageText(
            !globalStore.seeMonthCost.isLast
              ? t("no_cost_month")
              : t("no_cost_last_month")
          );
  } catch (e) {
    await ctx?.editMessageText(`${t("err_see_cost_req")}: ${e}`);
  }
};

const monthCostShaper = (bot: Telegraf<IBotContext>, trigger: string) => {
  bot.action(trigger, async (ctx) => {
    globalStore.seeMonthCost.ctx = ctx;
    globalStore.seeMonthCost.isYearTyped = false;
    globalStore.seeMonthCost.isMonthTyped = false;
    globalStore.seeMonthCost.isEnter = trigger === "cost_choose_month";
    globalStore.seeMonthCost.isLast = trigger === "cost_last_month";
    globalStore.seeMonthCost.costValues = [];

    if (!globalStore.seeMonthCost.isEnter) {
      const dateOptions = {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "2-digit",
      } as const;
      const [monthValue, yearValue] = new Date()
        .toLocaleDateString("ru-RU", dateOptions)
        .split(".");
      globalStore.seeMonthCost.year = yearValue;
      globalStore.seeMonthCost.month = !globalStore.seeMonthCost.isLast
        ? monthValue
        : `${+monthValue < 11 ? "0" : ""}${+monthValue - 1}`;
      await monthCostExecutor();
    } else {
      globalStore.activeInputAction[CostActionEnum.CHOOSE_MONTH] = true;
      await ctx.editMessageText(`${t("type_year")}:`);
    }
  });
};

export default monthCostShaper;

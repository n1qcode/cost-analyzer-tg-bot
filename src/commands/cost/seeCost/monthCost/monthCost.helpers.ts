import { Telegraf } from "telegraf";

import { costService } from "../../../../services/cost.service";
import { t } from "../../../../i18n";
import { IBotContext } from "../../../../context/context.interface";
import { CostActionEnum } from "../../cost.enums";
import { globalStore } from "../../../../main";

const _monthCostRequest = async (year: string, month: string) => {
  const response: Array<object> = await costService
    .getMonthCost(year, month)
    .then((res) => res.data);
  globalStore.costState.translator = await costService
    .getTranslationCostCategory()
    .then((res) => res.data);

  const columnText: string[] = [];

  if (response.length) {
    let amount = 0;
    const totalCost = response.reduce<Record<string, number>>((accum, curr) => {
      for (const [costKey, costValue] of Object.entries(curr)) {
        if (/cat/.test(String(costKey))) {
          if (!(String(costKey) in accum)) accum[String(costKey)] = +costValue;
          else accum[String(costKey)] += +costValue;
        }
      }
      return accum;
    }, {});

    for (const [costKey, costValue] of Object.entries(totalCost)) {
      if (/cat/.test(costKey)) {
        columnText.push(
          `<code>${
            globalStore.costState.translator[costKey] ?? costKey
          }: ${costValue} ${t("currency")}.</code>`
        );
        amount += costValue;
      }
    }

    columnText.push(
      `<i>${t("total_spent")}</i>: <u><b>${amount.toFixed(2)}</b></u> ${t(
        "currency"
      )}.`
    );
    return columnText;
  }
  return columnText;
};

export const monthCostExecutor = async () => {
  const ctx = globalStore.seeMonthCost.ctx;
  try {
    const costValues = await _monthCostRequest(
      globalStore.seeMonthCost.year,
      globalStore.seeMonthCost.month
    );
    globalStore.seeMonthCost.columnText.push(...costValues);

    globalStore.seeMonthCost.columnText.unshift(
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

    if (globalStore.seeMonthCost.columnText.length > 1) {
      globalStore.seeMonthCost.isEnter
        ? await ctx?.reply(globalStore.seeMonthCost.columnText.join("\n"), {
            parse_mode: "HTML",
          })
        : await ctx?.editMessageText(
            globalStore.seeMonthCost.columnText.join("\n"),
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
    globalStore.seeMonthCost.columnText = [];

    if (!globalStore.seeMonthCost.isEnter) {
      const [yearValue, monthValue] = new Date()
        .toISOString()
        .split("T")[0]
        .split("-");
      globalStore.seeMonthCost.year = yearValue;
      globalStore.seeMonthCost.month = !globalStore.seeMonthCost.isLast
        ? monthValue
        : `0${+monthValue - 1}`;
      await monthCostExecutor();
    } else {
      globalStore.activeInputAction[CostActionEnum.CHOOSE_MONTH] = true;
      await ctx.editMessageText(`${t("type_year")}:`);
    }
  });
};

export default monthCostShaper;

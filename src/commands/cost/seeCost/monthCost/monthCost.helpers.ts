import { Telegraf } from "telegraf";

import { costService } from "../../../../services/cost.service";
import { t } from "../../../../i18n";
import translator from "../../../../utils/translator";
import { IBotContext } from "../../../../context/context.interface";
import activeInputActionRefresher from "../../utils/activeInputActionRefresher";
import { CostActionEnum } from "../../cost.enums";
import { globalStore } from "../../../../main";

const _monthCostRequest = async (year: string, month: string) => {
  const response: Array<object> = await costService
    .getMonthCost(year, month)
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
          `<code>${translator(costKey)}: ${costValue} ${t("currency")}.</code>`
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

const monthCostShaper = (bot: Telegraf<IBotContext>, trigger: string) => {
  const isEnter = trigger === "cost_choose_month";
  let columnText: string[] = [];
  let isMonthTyped = false;
  let isYearTyped = false;
  bot.action(trigger, async (ctx) => {
    isYearTyped = false;
    isMonthTyped = false;
    const isLast = trigger === "cost_last_month";
    let year = "";
    let month = "";
    columnText = [];

    const _monthCostExecutor = async () => {
      try {
        const costValues = await _monthCostRequest(year, month);
        columnText.push(...costValues);

        columnText.unshift(
          `${
            isEnter
              ? `<b><u>${t(
                  "typed_month_cost"
                )}</u>:</b> <i>${year}.${month}</i>`
              : t(isLast ? "last_month_cost" : "curr_month_cost")
          }:`
        );

        if (columnText.length > 1) {
          isEnter
            ? ctx.reply(columnText.join("\n"), {
                parse_mode: "HTML",
              })
            : ctx.editMessageText(columnText.join("\n"), {
                parse_mode: "HTML",
              });
        } else
          isEnter
            ? ctx.reply(!isLast ? t("no_cost_month") : t("no_cost_last_month"))
            : ctx.editMessageText(
                !isLast ? t("no_cost_month") : t("no_cost_last_month")
              );
      } catch (e) {
        await ctx.editMessageText(`${t("err_see_cost_req")}: ${e}`);
      }
    };

    if (!isEnter) {
      const [yearValue, monthValue] = new Date()
        .toISOString()
        .split("T")[0]
        .split("-");
      year = yearValue;
      month = !isLast ? monthValue : `0${+monthValue - 1}`;
      await _monthCostExecutor();
    } else {
      activeInputActionRefresher(
        globalStore.activeInputAction,
        CostActionEnum.CHOOSE_MONTH
      );
      await ctx.editMessageText(`${t("type_year")}:`);
      bot.hears(/.*/, async (ctx) => {
        if (isYearTyped && isMonthTyped) return;
        const isYearValid = /^\d{4}$/;
        const isMonthValid = /^(0?[1-9]|1[0-2])$/;
        const value = ctx.message.text;

        if (!isYearTyped && !isMonthTyped) {
          if (isYearValid.test(value)) {
            year = value;
            isYearTyped = true;
            await ctx.reply(`${t("type_month")}:`);
            return;
          } else await ctx.reply(t("number_check"));
        }
        if (isYearTyped && !isMonthTyped) {
          if (isMonthValid.test(value)) {
            month = value.length === 1 ? "0" + value : value;
            isMonthTyped = true;
            await _monthCostExecutor();
          } else await ctx.reply(t("number_check"));
        }
      });
    }
  });
};

export default monthCostShaper;

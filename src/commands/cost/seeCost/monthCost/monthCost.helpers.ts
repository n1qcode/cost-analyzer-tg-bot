import { Telegraf } from "telegraf";

import { costService } from "../../../../services/cost.service";
import { t } from "../../../../i18n";
import { IBotContext } from "../../../../context/context.interface";
import { CostActionEnum } from "../../cost.enums";
import costAppearanceShaper from "../utils/costAppearanceShaper";
import { CostTimeEnum } from "../../../../utils/enums";
import Stores from "../../../../store/Store";

const _monthCostRequest = async (
  year: string,
  month: string,
  userId: number
) => {
  const Store = Stores.get(userId);
  const ctx = Store.seeMonthCost.ctx;
  try {
    const response = await costService
      .getMonthCost(year, month)
      .then((res) => res.data);

    const { payload, error } = response;

    if (error) throw new Error(error);

    let costValues: string[] = [];

    if (payload?.length)
      costValues = costAppearanceShaper(payload, CostTimeEnum.MONTH, userId);

    return costValues;
  } catch (e) {
    console.log(e);
    if (Store.seeMonthCost.isEnter)
      await ctx?.reply(`🚫 ${t("err_see_cost_req")}`);
    else await ctx?.editMessageText(`🚫 ${t("err_see_cost_req")}`);
  }
};

export const monthCostExecutor = async (userId: number) => {
  const Store = Stores.get(userId);
  const ctx = Store.seeMonthCost.ctx;
  try {
    const costValues = await _monthCostRequest(
      Store.seeMonthCost.year,
      Store.seeMonthCost.month,
      userId
    );
    if (!costValues) return;

    Store.seeMonthCost.costValues.push(...costValues);

    Store.seeMonthCost.costValues.unshift(
      `${
        Store.seeMonthCost.isEnter
          ? `<b><u>${t("typed_month_cost")}</u>:</b> <i>${
              Store.seeMonthCost.year
            }.${Store.seeMonthCost.month}</i>`
          : `<u><b>${t(
              Store.seeMonthCost.isLast ? "last_month_cost" : "curr_month_cost"
            )}</b></u>`
      }:`
    );

    if (Store.seeMonthCost.costValues.length > 1) {
      Store.seeMonthCost.isEnter
        ? await ctx?.reply(Store.seeMonthCost.costValues.join("\n"), {
            parse_mode: "HTML",
          })
        : await ctx?.editMessageText(Store.seeMonthCost.costValues.join("\n"), {
            parse_mode: "HTML",
          });
    } else
      Store.seeMonthCost.isEnter
        ? await ctx?.reply(
            !Store.seeMonthCost.isLast
              ? t("no_cost_month")
              : t("no_cost_last_month")
          )
        : await ctx?.editMessageText(
            !Store.seeMonthCost.isLast
              ? t("no_cost_month")
              : t("no_cost_last_month")
          );
  } catch (e) {
    await ctx?.editMessageText(`${t("err_see_cost_req")}: ${e}`);
  }
};

const monthCostShaper = (bot: Telegraf<IBotContext>, trigger: string) => {
  bot.action(trigger, async (ctx) => {
    if (!ctx.from) {
      await ctx?.reply("🚫 Error: userId is not specified");
      return;
    }
    const Store = Stores.get(ctx.from.id);
    Store.seeMonthCost.ctx = ctx;
    Store.seeMonthCost.isYearTyped = false;
    Store.seeMonthCost.isMonthTyped = false;
    Store.seeMonthCost.isEnter = trigger === "cost_choose_month";
    Store.seeMonthCost.isLast = trigger === "cost_last_month";
    Store.seeMonthCost.costValues = [];

    if (!Store.seeMonthCost.isEnter) {
      const dateOptions = {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "2-digit",
      } as const;
      const [monthValue, yearValue] = new Date()
        .toLocaleDateString("ru-RU", dateOptions)
        .split(".");
      Store.seeMonthCost.year = yearValue;
      Store.seeMonthCost.month = !Store.seeMonthCost.isLast
        ? monthValue
        : `${+monthValue < 11 ? "0" : ""}${+monthValue - 1}`;
      await monthCostExecutor(ctx.from.id);
    } else {
      Store.activeInputAction[CostActionEnum.CHOOSE_MONTH] = true;
      await ctx.editMessageText(`${t("type_year")}:`);
    }
  });
};

export default monthCostShaper;

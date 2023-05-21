import { Markup, Telegraf } from "telegraf";

import { IBotContext } from "../context/context.interface";
import { costService } from "../services/cost.service";
import translator from "../utils/translator";
import { t } from "../i18n";

import { Command } from "./command.class";

export class CostCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  private readonly MAIN_BUTTONS = {
    add_cost: `💰 ${t("add_cost")}`,
    see_cost: `😰 ${t("see_cost")}`,
    add_cost_cat: `😎 ${t("add_cost_cat")}`,
  };

  private costCategories: string[] = [];
  private chosenCategory = "";
  private isCatAdd = false;

  handle() {
    this.bot.command("cost", async (ctx) => {
      return await ctx.reply(
        t("spend_carefully"),
        Markup.keyboard([
          [this.MAIN_BUTTONS.add_cost, this.MAIN_BUTTONS.see_cost],
          [this.MAIN_BUTTONS.add_cost_cat],
        ])
          .oneTime()
          .resize()
      );
    });

    this.bot.hears(this.MAIN_BUTTONS.add_cost, async (ctx) => {
      this.costCategories = await costService
        .getCostCategories()
        .then((res) => res.data);
      ctx.reply(`<b>${t("choose_cat_to_add")}:</b>`, {
        parse_mode: "HTML",
        ...Markup.inlineKeyboard([
          ...this.costCategories.map((cat: string) => [
            Markup.button.callback(translator(cat), cat),
          ]),
        ]),
      });
    });
    this.bot.hears(this.MAIN_BUTTONS.see_cost, async (ctx) => {
      ctx.reply(`<b>${t("choose_cat_to_see")}</b>`, {
        parse_mode: "HTML",
        ...Markup.inlineKeyboard([
          [Markup.button.callback(t("today_cost"), "today_cost")],
          [Markup.button.callback(t("month_cost"), "month_cost")],
          [Markup.button.callback(t("season_cost"), "season_cost")],
          [Markup.button.callback(t("year_cost"), "year_cost")],
          [Markup.button.callback(t("choose_date_cost"), "choose_date_cost")],
          [
            Markup.button.callback(
              t("choose_period_cost"),
              "choose_period_cost"
            ),
          ],
        ]),
      });
    });

    this.bot.hears(this.MAIN_BUTTONS.add_cost_cat, (ctx) =>
      ctx.reply("Click Add cost category!")
    );

    this.bot.action("today_cost", async (ctx) => {
      try {
        const date = new Date().toISOString().split("T")[0];
        const response: Array<object> = await costService
          .getDayCost(date)
          .then((res) => res.data);

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
      } catch (e) {
        await ctx.editMessageText(`${t("err_see_cost_req")}: ${e}`);
      }
    });

    this.bot.action(/cat/, async (ctx) => {
      this.isCatAdd = false;
      this.chosenCategory = ctx.match.input;
      await ctx.editMessageText(`${t("type_amount_cost")}:`);

      this.bot.hears(/.*/, async (ctx) => {
        if (this.isCatAdd) return;
        const value = ctx.message.text;
        const spentAmount = value.includes(",")
          ? +value.split(",").join(".")
          : +value;

        if (Number.isNaN(spentAmount)) {
          await ctx.reply(t("number_check"));
        } else {
          try {
            const response = await costService
              .addToCostCategory({
                user_id: 1,
                cost_category: this.chosenCategory,
                cost_amount: spentAmount,
              })
              .then((res) => res.data);

            await ctx.replyWithHTML(
              `<b>${t("saved")}!</b>\n${t("category")} - ${translator(
                this.chosenCategory
              )}\n<i>${t("amount")}</i> - <u>${response
                .split(":")
                .at(-1)}</u> ${t("currency")}.`
            );
            this.isCatAdd = true;
          } catch (e) {
            await ctx.reply(`${t("err_add_cost_req")}: ${e}`);
          }
        }
      });
    });
  }
}

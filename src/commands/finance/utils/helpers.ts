import { Markup, Telegraf } from "telegraf";

import { IFinance } from "../../../typings/finance.typings";
import { t } from "../../../i18n";
import { CurrencyEnum, LastPlacesEnum } from "../../../utils/enums";
import { IUsersCurrencies } from "../../../typings/users.typings";
import { usersService } from "../../../services/users.service";
import { IBotContext } from "../../../context/context.interface";
import sumSpaceDivider from "../../../utils/sumSpaceDivider";

import { MAIN_BUTTONS } from "./constants";

export const isEmptyFinanceInspector = (elem: IFinance | undefined) => {
  let isEmpty = true;
  for (const [key, value] of Object.entries(elem ?? {})) {
    if (key === "id") continue;
    if (+value) {
      isEmpty = false;
      break;
    }
  }
  return isEmpty;
};

export const financeAppearanceShaper = (
  elem?: IFinance,
  isPocketMoney?: boolean
) => {
  const niceAppearance = [
    `${
      !isPocketMoney ? `💰 ${t("money_box")}` : `💵 🫰 ${t("pocket_money")}`
    }\n<u><b>${t(
      !isPocketMoney ? "finance_accumulated" : "left_money"
    )}</b></u>:`,
  ];
  for (const [key, value] of Object.entries(elem ?? {})) {
    if (key === "id" || !+value) continue;
    let currencyValue = `${t("currency")}.`;
    if (key === CurrencyEnum.EUR) currencyValue = t("currency_short_eur");
    if (key === CurrencyEnum.USD) currencyValue = `${t("currency_short_usd")}.`;
    niceAppearance.push(
      `<code>${t(key)}: ${sumSpaceDivider(
        String(value)
      )} ${currencyValue}</code>`
    );
  }
  return niceAppearance;
};

export const currencyUpdater = async (
  bot: Telegraf<IBotContext>,
  userInfo: IUsersCurrencies
) => {
  const { user_id, last_place, currency } = userInfo;
  if (
    last_place === LastPlacesEnum.FINANCE &&
    currency !== null &&
    currency !== CurrencyEnum.RUB
  ) {
    try {
      await usersService.setUserCurrency({
        userId: +user_id,
        currency: CurrencyEnum.RUB,
      });
    } catch (e) {
      await bot.telegram.sendMessage(
        user_id,
        `🚫 ${t("update_currency_remote_error")}`,
        {
          parse_mode: "HTML",
        }
      );
    }
    await bot.telegram.sendMessage(
      user_id,
      `${t("currency_updated")}: ${t(CurrencyEnum.RUB)}`,
      Markup.keyboard([
        [MAIN_BUTTONS.money_box],
        [MAIN_BUTTONS.pocket_money],
        [MAIN_BUTTONS.currency],
      ]).resize()
    );
  }
};

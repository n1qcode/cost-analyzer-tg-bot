import { Markup, Telegraf } from "telegraf";

import { usersService } from "../services/users.service";
import { IBotContext } from "../context/context.interface";
import { MAIN_BUTTONS } from "../commands/finance/utils/constants";

import { CurrencyEnum, LastPlacesEnum } from "./enums";

export const lastPlaceInspector = async (bot: Telegraf<IBotContext>) => {
  const places =
    (await usersService.getUsersCurrencies().then((res) => res.data.payload)) ??
    [];
  for (const { user_id, last_place, currency } of places) {
    if (
      last_place === LastPlacesEnum.FINANCE &&
      currency !== null &&
      currency !== CurrencyEnum.RUB
    ) {
      await bot.telegram.sendMessage(
        user_id,
        "Текущая валюта обновлена!",
        Markup.keyboard([
          [MAIN_BUTTONS.money_box],
          [MAIN_BUTTONS.pocket_money],
          [MAIN_BUTTONS.currency],
        ]).resize()
      );
    }
  }
};

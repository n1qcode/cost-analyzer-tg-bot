import { Telegraf } from "telegraf";
import config from "config";

import { usersService } from "../services/users.service";
import { IBotContext } from "../context/context.interface";
import { t } from "../i18n";
import { currencyUpdater } from "../commands/finance/utils/helpers";

export const lastPlaceInspector = async (bot: Telegraf<IBotContext>) => {
  try {
    const places =
      (await usersService.getUsersInfo().then((res) => res.data.payload)) ?? [];
    for (const place of places) {
      await currencyUpdater(bot, place);
    }
  } catch (e) {
    console.log(e);
    const users: number[] = config.get("USERS_ACCESS") ?? [];
    users.forEach((user) => {
      bot.telegram.sendMessage(
        user,
        `🚫 ${t("user_info_error")}!\n${t("not_actual_info")}`,
        {
          parse_mode: "HTML",
        }
      );
    });
  }
};

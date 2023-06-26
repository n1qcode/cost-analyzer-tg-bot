import { Telegraf } from "telegraf";
import config from "config";

import { IBotContext } from "../../context/context.interface";

class Informer {
  static update(bot: Telegraf<IBotContext>) {
    const users: number[] = config.get("USERS_ACCESS") ?? [];
    users.forEach((user) => {
      bot.telegram.sendMessage(user, config.get("UPDATE_INFO"), {
        parse_mode: "HTML",
      });
    });
  }
  static endMonth(bot: Telegraf<IBotContext>) {
    const END_MONTH_INFORM_DAY = 1;
    const END_MONTH_INFORM_HOUR = 10;
    const DAY_INTERVAL = 24 * 60 * 60 * 1000;
    const HOUR_INTERVAL = 60 * 60 * 1000;
    const dateOptions = {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
    } as const;
    const date = new Date().toLocaleDateString("ru-RU", dateOptions);
    const day = +(date.split(".")[0] ?? "");
    const hour = +(date.split(",").at(-1) ?? "");

    let hourInterval: NodeJS.Timer | null = null;

    setInterval(() => {
      if (day === END_MONTH_INFORM_DAY) {
        if (!hourInterval)
          hourInterval = setInterval(() => {
            if (hour === END_MONTH_INFORM_HOUR) {
              const users: number[] = config.get("USERS_ACCESS") ?? [];
              users.forEach((user) => {
                bot.telegram.sendMessage(
                  user,
                  "Here must be inform message...", // TODO
                  {
                    parse_mode: "HTML",
                  }
                );
              });
            }
          }, HOUR_INTERVAL);
      } else if (hourInterval) clearInterval(hourInterval);
    }, DAY_INTERVAL);
  }
}

export default Informer;

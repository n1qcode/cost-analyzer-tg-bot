import { Telegraf } from "telegraf";
import config from "config";

import { IBotContext } from "../../context/context.interface";
import monthsComparator from "../../commands/statistics/utils/monthsComparator";
import { t } from "../../i18n";

class Informer {
  static offsetGenerator(timeZone: number) {
    return 1000 * 3600 * timeZone;
  }
  static update(bot: Telegraf<IBotContext>) {
    const users: number[] = config.get("USERS_ACCESS") ?? [];
    users.forEach((user) => {
      bot.telegram.sendMessage(user, config.get("UPDATE_INFO"), {
        parse_mode: "HTML",
      });
    });
  }
  static endMonth(bot: Telegraf<IBotContext>) {
    const INFORM_DAY = 17;
    const INFORM_HOUR = 10;
    const DAY_INTERVAL = 24 * 3600 * 1000;

    const currentDate = new Date();
    const hour = currentDate.getHours();
    let day = currentDate.getDate();

    const _restTimeGenerator = (mode: "day" | "hour") => {
      const isNewDay = mode === "day";

      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const targetDate = isNewDay
        ? new Date(year, month, day + 1)
        : new Date(year, month, INFORM_DAY, INFORM_HOUR);
      const targetTime = targetDate.getTime();

      return targetTime - currentTime;
    };

    const _startTimeout = () => {
      const timeoutMs = _restTimeGenerator("hour");
      let timeout: NodeJS.Timeout | null = null;

      timeout = setTimeout(async () => {
        const users: number[] = config.get("USERS_ACCESS") ?? [];
        let informMessage = "";
        try {
          informMessage = (await monthsComparator(new Date().getMonth())) ?? "";
        } catch (e) {
          console.log(e);
          informMessage = t("err_get_cost_last_month");
        }

        if (informMessage)
          users.forEach((user) => {
            bot.telegram.sendMessage(user, informMessage, {
              parse_mode: "HTML",
            });
          });

        if (timeout) clearTimeout(timeout);
      }, timeoutMs);
    };

    let intervalMs =
      hour < INFORM_HOUR ? DAY_INTERVAL : _restTimeGenerator("day");

    const _startInterval = () => {
      let interval: NodeJS.Timer | null = null;
      interval = setInterval(() => {
        day = new Date().getDate();
        if (day === INFORM_DAY) _startTimeout();
        if (intervalMs !== DAY_INTERVAL) {
          intervalMs = DAY_INTERVAL;
          if (interval) clearInterval(interval);
          _startInterval();
        }
      }, intervalMs);
    };

    if (day === INFORM_DAY) _startTimeout();

    _startInterval();
  }

  static launch(bot: Telegraf<IBotContext>) {
    if (config.get("UPDATE_INFO")) Informer.update(bot);
    Informer.endMonth(bot);
  }
}

export default Informer;

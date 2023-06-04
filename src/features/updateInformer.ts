import config from "config";
import { Telegraf } from "telegraf";

import { IBotContext } from "../context/context.interface";

const updateInformer = (bot: Telegraf<IBotContext>) => {
  const users: number[] = config.get("USERS_ACCESS") ?? [];
  users.forEach((user) => {
    bot.telegram.sendMessage(user, config.get("UPDATE_INFO"), {
      parse_mode: "HTML",
    });
  });
};

export default updateInformer;

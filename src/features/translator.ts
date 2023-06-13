import { Telegraf } from "telegraf";
import config from "config";

import { IBotContext } from "../context/context.interface";
import { costService } from "../services/cost.service";
import { globalStore } from "../main";
import { t } from "../i18n";

class Translator {
  private readonly bot: Telegraf<IBotContext>;

  constructor(bots: Telegraf<IBotContext>) {
    this.bot = bots;
  }

  async get() {
    if (globalStore.costState.translator) return;
    try {
      const response = await costService
        .getTranslationCostCategory()
        .then((res) => res.data);
      const { isError, payload } = response;
      if (isError) throw new Error(t("get_translation_error"));
      globalStore.costState.translator = payload;
    } catch (e) {
      const users: number[] = config.get("USERS_ACCESS") ?? [];
      users.forEach((user) => {
        this.bot.telegram.sendMessage(user, e as string);
      }); // TODO USE UPDATE INFORMER
    }
  }
}

export default Translator;

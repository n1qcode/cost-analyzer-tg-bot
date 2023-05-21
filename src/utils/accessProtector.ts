import config from "config";
import { Context } from "telegraf";

import { t } from "../i18n";

const accessProtector = (ctx: Context) => {
  if (
    !(config.get("USERS_ACCESS") as number[]).includes(
      ctx.message?.from.id ?? 0
    )
  ) {
    ctx.reply(t("access_protect"));
    return false;
  }
  return true;
};

export default accessProtector;

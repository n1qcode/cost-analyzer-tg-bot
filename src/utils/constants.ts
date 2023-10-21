import config from "config";

import { t } from "../i18n";

export const commands = `
/start - ${t("reboot")}
/statistics - ${t("statistics_menu_label")}
/cost - ${t("cost_menu_label")}
/finance - ${t("finance_menu_label")}
/cost_help - ${t("add_to_cost")}
/finance_help -  ${t("finance_help")}
/help - ${t("help")}
`;

export const API_HOST = `http://${config.get("HOST")}:${config.get(
  "HOST_PORT"
)}/api`;

export const MAX_HEIGHT_CAT_BUTTONS = 4;

export const MONEY_REGEX =
  /^\s*\d{1,8}(?:[.,]\d{1,2})?(?:\s*[*+-]\s*\d{1,8}(?:[.,]\d{1,2})?)*\s*$/;

export const MAX_MONEY_REGEX = /^((?!0)\d{1,8}|0|\\d{1,2})($|\.$|\.\d{1,2}$)/;

export const SPACE = "\u00A0";

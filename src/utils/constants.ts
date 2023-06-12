import config from "config";

import { t } from "../i18n";

export const commands = `
/start - ${t("reboot")}
/statistics - ${t("statistics_menu_label")}
/cost - ${t("cost_menu_label")}
/add_cost_help - ${t("add_to_cost")}
/help - ${t("help")}
`;

export const API_HOST = `http://${config.get("HOST")}:${config.get(
  "HOST_PORT"
)}/api`;

export const MAX_HEIGHT_CAT_BUTTONS = 4;

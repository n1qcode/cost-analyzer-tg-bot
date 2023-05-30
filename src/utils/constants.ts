import config from "config";

import { t } from "../i18n";

export const commands = `
/start - ${t("reboot")}
/help - ${t("help")}
/cost - ${t("cost")}
/add_cost_help - ${t("add_to_cost")}
`;

export const API_HOST = `http://${config.get("HOST")}:${config.get(
  "HOST_PORT"
)}/api`;

import config from "config";

export const commands = `
/start - reboot bot
/help - help
/cost - expenses
`;

export const API_HOST = `http://${config.get("HOST")}:${config.get(
  "HOST_PORT"
)}/api`;

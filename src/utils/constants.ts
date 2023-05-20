import config from "config";

export const commands = `
/start - reboot bot
/help - help
/cost - expenses
`;

export const text1 = `
1 <b>Жирный Текст</b> для проверки обработчика
`;
export const text2 = `
2 <i>Курсивный Текст</i> для проверки обработчика, 
<s>Зачёркнутый текст</s> и 
<code>Моноширинный текст</code>
`;
export const text3 = `
3 <u>Подчёркнутый Текст</u>
`;

export const API_HOST = `http://${config.get("HOST")}:${config.get(
  "HOST_PORT"
)}/api`;

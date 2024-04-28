import { t } from "../../../i18n";
import Stores from "../../../store/Store";

export const MAIN_BUTTONS = {
  money_box: `💰  ${t("money_box")}`,
  pocket_money: `💵 🫰 ${t("pocket_money")}`,
  currency: (userId: number) => {
    const Store = Stores.get(userId);
    return `🪙 ${t("current_currency_label")} (${t(Store.finance.currency)})`;
  },
};

export const CURRENCY_REGEXP = new RegExp(`🪙 ${t("current_currency_label")}`);

export const MONEY_BOX_BUTTONS = {
  get_info: `👀 ${t("money_box_look")}`,
  put: `💵 ${t("put_money")}`,
  take: `🫳 🚫 ${t("take_money")}`,
};

export const POCKET_MONEY_BUTTONS = {
  get_info: `👀 ${t("pocket_money_look")}`,
  put: `💶 ${t("put_money")}`,
  take: `🫳 ${t("take_money")}`,
};

export const FINANCE_INPUT_ACTIONS = {
  FINANCE: false,
};

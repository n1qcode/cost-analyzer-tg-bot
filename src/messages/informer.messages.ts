import { t } from "../i18n";

const InformerMessages = {
  startMonth: `ℹ️ <b><u>${t("started_new_month")}</u>!</b>\n\n`,
  errGetLastMonth: t("err_get_cost_last_month"),
  errGetMoneyBoxLastMonth: t("err_money_box_last_month"),
} as const;

export default InformerMessages;

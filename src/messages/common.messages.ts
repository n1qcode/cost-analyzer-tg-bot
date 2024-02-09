import { t } from "../i18n";
import { SPACE } from "../utils/constants";
import sumSpaceDivider from "../utils/sumSpaceDivider";

const CommonMessages = {
  currency: t("currency"),
  less: `<b><u>${t("less").toLowerCase()}</u></b>`,
  more: `<b><u>${t("more").toLowerCase()}</u></b>`,
  numWithCurrencyRaw(value: number) {
    return `${sumSpaceDivider(String(value))}${SPACE}${this.currency}.`;
  },
  numWithCurrencyCode(value: number) {
    return `<code>${this.numWithCurrencyRaw(value)}.</code>`;
  },
} as const;

export default CommonMessages;

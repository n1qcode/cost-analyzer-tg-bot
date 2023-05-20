import config from "config";

import { LanguageEnum } from "./i18n.enums";

export const DEFAULT_LANGUAGE: string = config.get("LANGUAGE");
export const SUPPORTED_LANGUAGES = Object.values(LanguageEnum);

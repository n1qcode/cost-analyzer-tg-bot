import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./i18n.contants";
import { LanguageEnum } from "./i18n.enums";
import * as keySet from "./locales";

const _i18n = (
  keySet: Record<string, Record<string, string>>,
  lang: string
) => {
  return (key: string) => {
    if (!lang) {
      console.warn("lang is not defined.");
    }

    const language = lang || DEFAULT_LANGUAGE;
    const dictionary: Record<string, string> = keySet[language];

    if (!dictionary) {
      console.warn(`keySet with language '${language}' is not defined`);
      return key;
    }

    if (!dictionary[key]) {
      console.warn(`keySet with language '${language}' hasn't key '${key}'`);
      return key;
    }
    return dictionary[key];
  };
};

const i18n = (keySet: Record<string, object>, lang: string) => {
  const _keySet: Record<string, Record<string, string>> = {};

  for (const key in keySet) {
    if (SUPPORTED_LANGUAGES.includes(key as LanguageEnum)) {
      _keySet[key] = { ...keySet[key] };
    }
  }

  return _i18n(_keySet, lang);
};

export const t = i18n(keySet, DEFAULT_LANGUAGE);

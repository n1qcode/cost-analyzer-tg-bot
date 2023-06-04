import { Markup } from "telegraf";

import { HideableIKBtn } from "../typings/markup";
import { t } from "../i18n";

import { MAX_HEIGHT_CAT_BUTTONS } from "./constants";

const categoriesButtonsShaper = (
  categoriesByFrequency: string[],
  costCategories: string[],
  translator: Record<string, string>,
  isAll = false
) => {
  const categories = categoriesByFrequency.slice(0, MAX_HEIGHT_CAT_BUTTONS);
  if (
    !isAll
      ? categories.length !== MAX_HEIGHT_CAT_BUTTONS
      : categories.length < costCategories.length
  )
    categories.push(
      ...costCategories
        .filter((cat) => !categoriesByFrequency.includes(cat))
        .slice(
          0,
          !isAll ? MAX_HEIGHT_CAT_BUTTONS - categories.length : Infinity
        )
    );
  const categoriesButtons: HideableIKBtn[][] = [];
  let tempCatBtnValue: HideableIKBtn[] = [];

  (Array.isArray(categories) ? categories : []).forEach((cat, index) => {
    if (!tempCatBtnValue.length)
      tempCatBtnValue.push(Markup.button.callback(translator[cat] ?? cat, cat));
    else {
      categoriesButtons.push([
        ...tempCatBtnValue,
        Markup.button.callback(translator[cat] ?? cat, cat),
      ]);
      tempCatBtnValue = [];
    }
    if (index === costCategories.length - 1)
      categoriesButtons.push([...tempCatBtnValue]);
  });

  if (
    categoriesButtons.flat().length <
    costCategories.length - MAX_HEIGHT_CAT_BUTTONS
  )
    categoriesButtons.push([
      Markup.button.callback(t("show_all"), "show_all_categories"),
    ]);

  return categoriesButtons;
};

export default categoriesButtonsShaper;

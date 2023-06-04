import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";

declare type Hideable<B> = B & {
  hide?: boolean;
};

declare type HideableIKBtn = Hideable<InlineKeyboardButton>;

import { Context } from "telegraf";
import { Message, Update } from "telegraf/types";

export type ContextExt = Context<Update.MessageUpdate<Message.TextMessage>>;

import { Context } from "telegraf";

export interface IBotContext extends Context {
  category: string;
  cost: number;
}

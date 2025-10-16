import MyContext from "../helpers/context.ts";
import { openWs } from "../websocket/main.ts";

export default async (ctx: MyContext) => {
  await ctx.reply(`message: ${openWs()}`);
};

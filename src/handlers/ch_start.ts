import MyContext from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  return await ctx.reply("hello");
};

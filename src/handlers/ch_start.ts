import MyContext from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  await ctx.reply("hello");
};

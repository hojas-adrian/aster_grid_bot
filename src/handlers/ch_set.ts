import MyContext from "../helpers/context.ts";
import { gird } from "../aster/grid.ts";

export default async (ctx: MyContext) => {
  const [low, high, gridCount] = (ctx.match as string).split(" ");

  const levels = gird.calculateLevels({
    low: +low,
    high: +high,
    gridCount: +gridCount,
  });
  const profit = await gird.testProfit(levels);

  return await ctx.reply(`${levels} ${profit}`);
};

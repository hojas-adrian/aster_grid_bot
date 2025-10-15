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

  let levelsOutput = "";

  levels.forEach((level, i) => {
    levelsOutput += `${(i + 1).toString().padStart(3, "0")} - ${level.toFixed(
      3
    )}\n`;
  });

  return await ctx.reply(
    `${levelsOutput}\nGanancias estimadas ${profit[0].toFixed(
      2
    )}% - ${profit[0].toFixed(2)}%`
  );
};

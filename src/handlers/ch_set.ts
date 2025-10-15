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
  const price = await gird.getPrice();

  levels.forEach((level, i) => {
    levelsOutput += `${(i + 1).toString().padStart(3, "0")} - ${
      level < price ? "🟢" : "🔴"
    }${level.toFixed(3)}\n`;
  });

  const asterAmount = 0.01448 / levels.at(-1)!;

  const MinCap = levels.reduce(
    (cap, level) => {
      level > price
        ? (cap.aster += asterAmount)
        : (cap.usdt += asterAmount * level);
      return cap;
    },
    { aster: 0, usdt: 0 }
  );

  return await ctx.reply(
    `${levelsOutput}\nGanancias estimadas: ${profit[0].toFixed(
      2
    )}% - ${profit[1].toFixed(2)}%\nInversion minima: ${MinCap.aster.toFixed(
      2
    )} aster - ${MinCap.usdt.toFixed(2)} usdt`
  );
};

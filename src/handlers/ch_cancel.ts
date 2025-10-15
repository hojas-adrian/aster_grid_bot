import MyContext from "../helpers/context.ts";
import { gird } from "../aster/grid.ts";

export default async (ctx: MyContext) => {
  const response = 3; //await gird.cancelAll();

  ctx.reply(`message: ${response}`);
};

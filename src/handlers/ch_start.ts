import MyContext from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  const id = ctx.session?.pkmId;
};

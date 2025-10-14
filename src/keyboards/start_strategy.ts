import { InlineKeyboard } from "../deps.ts";

const inlineKeyboard = () => {
  return new InlineKeyboard().text("🟢 run").text("❌ cancel");
};

export default inlineKeyboard;

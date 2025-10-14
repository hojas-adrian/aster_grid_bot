import { Aster } from "./aster.ts";
const aster = new Aster("ASTERUSDT");

const price = await aster.getPrice();

export class convert {
  constructor() {}

  toCripto(amount: number) {
    return amount / price;
  }

  toUsd(amount: number) {
    return amount * price;
  }
}

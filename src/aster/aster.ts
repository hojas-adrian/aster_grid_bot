import { AsterSpotSdk } from "../sdk/mod.ts";
import type { LatestPrice } from "../sdk/models/market/LatestPrice.ts";
import { ASTER_API_KEY, ASTER_API_SECRET } from "../helpers/constants.ts";

const sdk = new AsterSpotSdk({
  apiKey: ASTER_API_KEY,
  apiSecret: ASTER_API_SECRET,
  baseUrl: "https://sapi.asterdex.com",
});

export class Aster {
  constructor(private symbol: string) {}

  async getPrice() {
    const response = await sdk.market.getLatestPrice(this.symbol);

    return +(response as LatestPrice).price;
  }

  async getCommission() {
    return await sdk.market.getCommissionRate(this.symbol);
  }

  async buy(quantity: number, { price, id }: { price: number; id: number }) {
    return await sdk.spot.placeOrder({
      symbol: this.symbol,
      side: "BUY",
      type: "LIMIT",
      options: {
        quantity: quantity.toString(),
        price: price.toString(),
        timeInForce: "GTC",
        newClientOrderId: id.toString(),
      },
    });
  }

  async sell(quantity: number, { price, id }: { price: number; id: number }) {
    return await sdk.spot.placeOrder({
      symbol: this.symbol,
      side: "SELL",
      type: "LIMIT",
      options: {
        quantity: quantity.toString(),
        price: price.toString(),
        timeInForce: "GTC",
        newClientOrderId: id.toString(),
      },
    });
  }

  async getBalance() {
    const account = await sdk.account.getAccountInfo();

    return account.balances;
  }

  async generatelistenKey() {
    const response = await sdk.account.generateListenKey();

    return response.listenKey;
  }
}

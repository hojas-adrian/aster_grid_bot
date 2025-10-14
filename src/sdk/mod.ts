import { ApiConfig } from "./config/ApiConfig.ts";
import { Signer } from "./auth/Signer.ts";
import { HttpClient } from "./transport/HttpClient.ts";
import { MarketService } from "./services/MarketService.ts";
import { SpotService } from "./services/SpotService.ts";
import { AccountService } from "./services/AccountService.ts";

export class AsterSpotSdk {
  public market: MarketService;
  public spot: SpotService;
  public account: AccountService;

  constructor(config: ApiConfig) {
    const signer = new Signer(config.apiSecret);
    const http = new HttpClient(config, signer);
    this.market = new MarketService(http);
    this.spot = new SpotService(http);
    this.account = new AccountService(http);
  }
}

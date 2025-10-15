import { AccountInfo } from "../models/account/AccountInfo.ts";
import { ListenKey } from "../models/account/ListenKey.ts";
import { HttpClient } from "../transport/HttpClient.ts";
//import { SpotOrderResponse } from "../models/account/Order.ts";

export class AccountService {
  constructor(private http: HttpClient) {}

  async getAccountInfo(): Promise<AccountInfo> {
    return await this.http.request<AccountInfo>(
      "GET",
      "/api/v1/account",
      {},
      true
    );
  }

  async generateListenKey(): Promise<ListenKey> {
    return await this.http.request<ListenKey>(
      "POST",
      "/api/v1/listenKey",
      {},
      true
    );
  }

  async extendListenKey(listenKey: string): Promise<any> {
    const params = listenKey;
    return await this.http.request<any>(
      "PUT",
      "/api/v1/listenKey",
      { params },
      true
    );
  }
}

import {
  OrderSide,
  OrderType,
  TimeInForce,
} from "../models/trade/OrderEnums.ts";
import { CancelAllOrderResponse } from "../models/trade/CancelOrder.ts";
import { Order } from "../models/trade/Order.ts";
import { HttpClient } from "../transport/HttpClient.ts";

export class SpotService {
  constructor(private http: HttpClient) {}

  async placeOrder(order: {
    symbol: string;
    side: OrderSide;
    type: OrderType;
    options?: {
      timeInForce?: TimeInForce;
      quantity?: string;
      quoteOrderQty?: string;
      price?: string;
      newClientOrderId?: string;
      stopPrice?: string;
      recvWindow?: number;
    };
  }): Promise<Order> {
    return await this.http.request<Order>("POST", "/api/v1/order", order, true);
  }

  async cancelOrder(
    symbol: string,
    options?: {
      orderId?: number;
      origClientOrderId?: string;
      recvWindow?: number;
    }
  ): Promise<Order> {
    const params = { symbol, ...options };
    return await this.http.request<Order>("DEL", "/api/v1/order", params, true);
  }

  async getOrder(params: {
    symbol: string;
    options?: {
      orderId?: string;
      origClientOrderId?: string;
      recvWindow?: number;
    };
  }): Promise<Order> {
    return await this.http.request<Order>("GET", "/api/v1/order", params, true);
  }

  async getOpenOrder(params: {
    symbol?: string;
    options?: {
      recvWindow?: number;
    };
  }): Promise<Order[]> {
    return await this.http.request<Order[]>(
      "GET",
      "/api/v1/openOrders",
      params,
      true
    );
  }
  async cancelOpenOrder(
    symbol: string,
    options?: {
      orderIdList?: string | string[];
      origClientOrderIdList?: string | string[];
      recvWindow?: number;
    }
  ): Promise<CancelAllOrderResponse> {
    const params = { symbol, ...options };

    return await this.http.request<CancelAllOrderResponse>(
      "DELETE",
      "/api/v1/allOpenOrders",
      params,
      true
    );
  }
}

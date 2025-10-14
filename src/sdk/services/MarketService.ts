import { ExchangeInfo } from "../models/market/ExchangeInfo.ts";
import { OrderBook } from "../models/market/OrderBook.ts";
import { Trade } from "../models/market/Trade.ts";
import { AggregatedTrade } from "../models/market/AggregatedTrade.ts";
import type { Kline } from "../models/market/Kline.ts";
import { Ticket24h } from "../models/market/Ticket24h.ts";
import { LatestPrice } from "../models/market/LatestPrice.ts";
import { BookTicker } from "../models/market/BookTicket.ts";
import { CommissionRate } from "../models/market/CommissionRate.ts";
import { HttpClient } from "../transport/HttpClient.ts";

//import { Ticker24h } from "../models/market/Ticker24h.ts";
//import { BookTicker } from "../models/market/BookTicker.ts";

export class MarketService {
  constructor(private http: HttpClient) {}

  async ping(): Promise<Record<PropertyKey, never>> {
    return await this.http.request<Record<PropertyKey, never>>(
      "GET",
      "/api/v1/ping",
      {},
      false
    );
  }

  async getServerTime(): Promise<{ serverTime: number }> {
    return await this.http.request<{ serverTime: number }>(
      "GET",
      "/api/v1/time",
      {},
      false
    );
  }

  async getExchangeInfo(): Promise<ExchangeInfo> {
    return await this.http.request<ExchangeInfo>(
      "GET",
      "/api/v1/exchangeInfo",
      {},
      false
    );
  }

  async getOrderBook(symbol: string, limit: number = 100): Promise<OrderBook> {
    const params = { symbol, limit };
    return await this.http.request<OrderBook>(
      "GET",
      "/api/v1/depth",
      params,
      false
    );
  }

  async getRecentTrades(
    symbol: string,
    limit: number = 500,
    fromId?: number
  ): Promise<Trade[]> {
    const params: Record<string, any> = { symbol, limit };
    if (fromId) {
      params.fromId = fromId;
    }
    return await this.http.request<Trade[]>(
      "GET",
      "/api/v1/trades",
      params,
      false
    );
  }

  async getHistoricalTrades(
    symbol: string,
    limit: number = 500,
    fromId?: number
  ): Promise<Trade[]> {
    const params: Record<string, any> = { symbol, limit };
    if (fromId) {
      params.fromId = fromId;
    }
    return await this.http.request<Trade[]>(
      "GET",
      "/api/v1/historicalTrades",
      params,
      true
    );
  }

  async getAggregatedTrades(
    symbol: string,
    options?: {
      fromId?: number;
      startTime?: number;
      endTime?: number;
      limit?: number;
    }
  ): Promise<AggregatedTrade[]> {
    const params: Record<string, any> = { symbol, ...options };
    return await this.http.request<AggregatedTrade[]>(
      "GET",
      "/api/v1/aggTrades",
      params,
      false
    );
  }

  async getKlines(
    symbol: string,
    interval: string,
    options?: { startTime?: number; endTime?: number; limit?: number }
  ): Promise<Kline[]> {
    const params: Record<string, any> = { symbol, interval, ...options };
    return await this.http.request<Kline[]>(
      "GET",
      "/api/v1/klines",
      params,
      false
    );
  }

  async get24hTicker(symbol?: string): Promise<Ticket24h | Ticket24h[]> {
    const params = symbol ? { symbol } : {};
    return await this.http.request<Ticket24h | Ticket24h[]>(
      "GET",
      "/api/v1/ticker/24hr",
      params,
      false
    );
  }

  async getLatestPrice(symbol?: string): Promise<LatestPrice | LatestPrice[]> {
    const params = symbol ? { symbol } : {};
    return await this.http.request<LatestPrice | LatestPrice[]>(
      "GET",
      "/api/v1/ticker/price",
      params,
      false
    );
  }

  async getBookTicker(symbol?: string): Promise<BookTicker | BookTicker[]> {
    const params = symbol ? { symbol } : {};
    return await this.http.request<BookTicker | BookTicker[]>(
      "GET",
      "/api/v1/ticker/bookTicker",
      params,
      false
    );
  }

  async getCommissionRate(
    symbol: string,
    options?: {
      receiveWindow?: number;
    }
  ): Promise<CommissionRate> {
    const params = {
      symbol,
      ...options,
    };
    return await this.http.request<CommissionRate>(
      "GET",
      "/api/v1/commissionRate",
      params,
      true
    );
  }
}

export interface RateLimit {
  rateLimitType: string; // REQUEST_WEIGHT, ORDERS, etc.
  interval: string; // MINUTE, SECOND, DAY...
  intervalNum: number;
  limit: number;
}

export interface Asset {
  asset: string;
}

export interface SymbolFilter {
  filterType: string;
  [key: string]: any; // Los filtros tienen campos distintos según el tipo
}

export interface SymbolInfo {
  symbol: string;
  status: string; // TRADING, BREAK, etc.
  baseAsset: string;
  quoteAsset: string;
  pricePrecision: number;
  quantityPrecision: number;
  baseAssetPrecision: number;
  quotePrecision: number;
  filters: SymbolFilter[];
  orderTypes: string[];
  timeInForce: string[];
  ocoAllowed: boolean;
}

export interface ExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: RateLimit[];
  exchangeFilters: any[];
  assets: Asset[];
  symbols: SymbolInfo[];
}

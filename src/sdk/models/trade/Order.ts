export interface Order {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  updatedTime: number;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
}

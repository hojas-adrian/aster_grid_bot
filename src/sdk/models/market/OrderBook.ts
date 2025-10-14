export interface OrderBook {
  lastUpdateId: number;
  E: number; // Message output time
  T: number; // Transaction time
  bids: [string, string][]; // Array de [price, qty]
  asks: [string, string][];
}

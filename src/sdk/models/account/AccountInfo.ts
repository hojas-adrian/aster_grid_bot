interface Balance {
  asset: string;
  free: string;
  locked: string;
}

export interface AccountInfo {
  feeTier: number;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  canBurnAsset: boolean;
  updateTime: number;
  balances: Balance[];
}

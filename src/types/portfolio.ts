export interface PortfolioToken {
  symbol: string;
  balance: number;
  priceUSD: number;
}

export interface SimulatedTransaction {
  id: string;
  description: string;
  txHash: string;
  timestamp: number;
}
export interface Pool {
  id: string;
  token0Symbol: string;
  token1Symbol: string;
  reserve0: number;
  reserve1: number;
  volumeUSD: number;
  totalValueLockedUSD: number;
}
export interface PoolReserves {
  reserveA: number;
  reserveB: number;
}

export interface SwapSimulationResult {
  amountOut: number;
  priceImpact: number;
}

export function simulateSwap(
  reserves: PoolReserves,
  amountIn: number
): SwapSimulationResult {
  const { reserveA, reserveB } = reserves;
  const newReserveA = reserveA + amountIn;
  const newReserveB = (reserveA * reserveB) / newReserveA;

  const amountOut = reserveB - newReserveB;

  const expectedPrice = reserveB / reserveA;
  const actualPrice = amountOut / amountIn;

  const priceImpact = ((expectedPrice - actualPrice) / expectedPrice) * 100;

  return {
    amountOut,
    priceImpact,
  };
}
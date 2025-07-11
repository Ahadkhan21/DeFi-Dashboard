import React, { useState } from "react";
import SwapForm from "./SwapForm";
import SwapResult from "./SwapResult";
import { simulateSwap, PoolReserves } from "../../services/uniswap";
import { usePortfolio } from "../../contexts/PortfolioContext";
import { v4 as uuidv4 } from "uuid";
import "../../assets/styles/Card.css";

const SwapPage: React.FC = () => {
  const { addTransaction } = usePortfolio();

  
  const [result, setResult] = useState<{
    amountOut: number;
    priceImpact: number;
  } | null>(null);

  const poolReserves: PoolReserves = {
    reserveA: 1000,
    reserveB: 200000,
  };

  const handleSimulate = (
    fromSymbol: string,
    toSymbol: string,
    amountIn: number
  ) => {
    const simulation = simulateSwap(poolReserves, amountIn);
    setResult(simulation);

    const tx = {
      id: uuidv4(),
      description: `Swap ${amountIn} ${fromSymbol} to ${toSymbol}`,
      txHash: generateRandomTxHash(),
      timestamp: Date.now(),
    };
    addTransaction(tx);
  };

const generateRandomTxHash = () => {
  return `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join("")}`;
};

  return (
    <div className="card">
      <h2 className="section-heading">Swap Simulator</h2>
      <SwapForm onSimulate={handleSimulate} />
      {result && (
        <SwapResult amountOut={result.amountOut} priceImpact={result.priceImpact} />
      )}
    </div>
  );
};

export default SwapPage;
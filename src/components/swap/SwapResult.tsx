import React from "react";
import "../../assets/styles/Card.css";

interface Props {
  amountOut: number;
  priceImpact: number;
}

const SwapResult: React.FC<Props> = ({ amountOut, priceImpact }) => {
  return (
    <div className="card">
      <p className="section-heading">Swap Simulation Result</p>
      <p>Estimated tokens received: <strong>{amountOut.toFixed(4)} UNI</strong></p>
      <p>Price impact: <strong>{priceImpact.toFixed(2)}%</strong></p>
    </div>
  );
};

export default SwapResult;
import React from "react";
import { Token } from "../../types/token";
import "../../assets/styles/TokenCard.css";

interface Props {
  token: Token;
}

const TokenCard: React.FC<Props> = ({ token }) => {
  const isPositive = token.price_change_percentage_24h >= 0;

  return (
    <div className="token-card">
      <img src={token.image} alt={token.name} />
      <div>
        <div className="token-card-name">{token.name} ({token.symbol.toUpperCase()})</div>
        <div className="token-card-price">${token.current_price.toFixed(2)}</div>
      </div>
      <div className={`token-card-change ${isPositive ? "positive" : "negative"}`}>
        {isPositive ? "+" : ""}
        {token.price_change_percentage_24h.toFixed(2)}%
      </div>
    </div>
  );
};

export default TokenCard;
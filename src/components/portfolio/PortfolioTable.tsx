import React from "react";
import { useTokenData } from "../../contexts/TokenDataContext";
import { PortfolioToken } from "../../types/portfolio";

interface Props {
  tokens: PortfolioToken[];
}

const PortfolioTable: React.FC<Props> = ({ tokens }) => {
  const { tokens: globalTokens } = useTokenData();

  const mergedTokens = tokens.map((t) => {
    const global = globalTokens.find(
      (gt) => gt.symbol.toUpperCase() === t.symbol.toUpperCase()
    );
    return {
      ...t,
      priceUSD: global?.current_price ?? t.priceUSD,
    };
  });

  return (
    <>
      <h3 className="section-heading">My Tokens</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Balance</th>
              <th>USD Value</th>
            </tr>
          </thead>
          <tbody>
            {mergedTokens.map((token) => (
              <tr key={token.symbol}>
                <td>{token.symbol}</td>
                <td>{token.balance}</td>
                <td>
                  $
                  {(token.balance * token.priceUSD).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>  
      </div>
      
    </>
  );
};

export default PortfolioTable;
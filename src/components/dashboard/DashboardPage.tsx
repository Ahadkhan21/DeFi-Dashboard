import React from "react";
import { useTokenData } from "../../contexts/TokenDataContext";
import TokenCard from "./TokenCard";
import GlobalChart from "./GlobalChart";
import "../../assets/styles/Card.css";

const DashboardPage: React.FC = () => {
  const { tokens, loading } = useTokenData();

  return (
    <div className="card">
      <h2 className="section-heading">Token Prices</h2>
      {loading && <p>Loading...</p>}
      <div className="token-grid">
        {tokens.length === 0 && !loading && (
          <p>No tokens found. Check your TokenDataContext.</p>
        )}
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
      <GlobalChart />
    </div>
  );
};

export default DashboardPage;

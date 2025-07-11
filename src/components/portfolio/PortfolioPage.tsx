import React from "react";
import { useWallet } from "../../contexts/WalletContext";
import { usePortfolio } from "../../contexts/PortfolioContext";
import PortfolioTable from "./PortfolioTable";
import TransactionList from "./TransactionList";
import Card from "../common/Card";

const PortfolioPage: React.FC = () => {
  const { address } = useWallet();
  const { tokens, transactions } = usePortfolio();

  if (!address) {
    return <p className="text-center text-gray-600">Please connect your wallet to view your portfolio.</p>;
  }

  return (
    <Card>
      <h2 className="section-heading">My Portfolio</h2>
      <div className="text-gray-600">Wallet Address: {address}</div>
      <PortfolioTable tokens={tokens} />
      <TransactionList transactions={transactions} />
    </Card>
  );
};

export default PortfolioPage;
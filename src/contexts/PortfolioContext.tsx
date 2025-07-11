import React, { createContext, useContext, useEffect, useState } from "react";
import { PortfolioToken } from "../types/portfolio";
import { Transaction } from "../types/transaction";

interface PortfolioContextType {
  tokens: PortfolioToken[];
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  reloadPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<PortfolioToken[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const reloadPortfolio = () => {
    const portfolio = localStorage.getItem("walletPortfolio");
    if (portfolio) {
      setTokens(JSON.parse(portfolio));
    } else {
      setTokens([]);
    }

    const storedTxs = localStorage.getItem("walletTransactions");
    if (storedTxs) {
      setTransactions(JSON.parse(storedTxs));
    } else {
      setTransactions([]);
    }
  };

  useEffect(() => {
    reloadPortfolio();
  }, []);

  const addTransaction = (tx: Transaction) => {
    const newTxs = [...transactions, tx];
    setTransactions(newTxs);
    localStorage.setItem("walletTransactions", JSON.stringify(newTxs));
    reloadPortfolio();
  };

  return (
    <PortfolioContext.Provider value={{ tokens, transactions, addTransaction, reloadPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }
  return context;
};

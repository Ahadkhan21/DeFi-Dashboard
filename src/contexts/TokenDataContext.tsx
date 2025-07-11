import React, { createContext, useContext, useEffect, useState } from "react";
import { Token } from "../types/token";
import { fetchTokenMarkets } from "../services/coingecko";

interface TokenDataContextType {
  tokens: Token[];
  loading: boolean;
}

const TokenDataContext = createContext<TokenDataContextType | undefined>(undefined);

const trackedTokenIds = [
  "ethereum",
  "uniswap",
  "chainlink",
  "aave",
  "usd-coin",
];

export const TokenDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTokenMarkets(trackedTokenIds)
      .then((data) => {
        setTokens(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <TokenDataContext.Provider value={{ tokens, loading }}>
      {children}
    </TokenDataContext.Provider>
  );
};

export const useTokenData = (): TokenDataContextType => {
  const context = useContext(TokenDataContext);
  if (!context) {
    throw new Error("useTokenData must be used inside TokenDataProvider");
  }
  return context;
};
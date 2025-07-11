import React, { createContext, useContext, useEffect, useState } from "react";

export interface Wallet {
  address: string;
  balanceETH: number;
}

interface WalletContextType {
  wallets: Wallet[];
  address: string | null;
  connectWallet: (addr: string) => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallets] = useState<Wallet[]>(generateFakeWallets());
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const connectWallet = (addr: string) => {
    setAddress(addr);
    localStorage.setItem("walletAddress", addr);

    // Create a mock portfolio for this wallet
    const mockPortfolio = generateMockPortfolio();
    localStorage.setItem("walletPortfolio", JSON.stringify(mockPortfolio));
    localStorage.setItem("walletTransactions", JSON.stringify([]));
  };

  const disconnectWallet = () => {
    setAddress(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletPortfolio");
    localStorage.removeItem("walletTransactions");
  };

  return (
    <WalletContext.Provider value={{ wallets, address, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return context;
};

const generateFakeWallets = (): Wallet[] => {
  return Array.from({ length: 3 }).map(() => ({
    address: generateRandomAddress(),
    balanceETH: randomNumber(0.5, 10),
  }));
};

const generateRandomAddress = (): string => {
  const hex = [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
  return `0x${hex.slice(0, 4)}...${hex.slice(-4)}`;
};

const randomNumber = (min: number, max: number) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(4));

const generateMockPortfolio = () => [
  { symbol: "ETH", balance: randomNumber(0.5, 10), priceUSD: 2777.12 },
  { symbol: "UNI", balance: randomNumber(10, 500), priceUSD: 8.33 },
  { symbol: "USDC", balance: randomNumber(100, 10000), priceUSD: 1.0 }
];

import React from "react";
import { WalletProvider } from "./contexts/WalletContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import { TokenDataProvider } from "./contexts/TokenDataContext";
import Header from "./components/common/Header";
import DashboardPage from "./components/dashboard/DashboardPage";
import SwapPage from "./components/swap/SwapPage";
import PoolsPage from "./components/pools/PoolsPage";
import PortfolioPage from "./components/portfolio/PortfolioPage";
import Footer from "./components/common/Footer";

const App: React.FC = () => {
  return (
    <WalletProvider>
      <PortfolioProvider>
        <TokenDataProvider>
          <Header />
          <main className="p-6 space-y-12">
            <DashboardPage />
            <SwapPage />
            <PoolsPage />
            <PortfolioPage />
          </main>
          <Footer />
        </TokenDataProvider>
      </PortfolioProvider>
    </WalletProvider>
  );
};

export default App;
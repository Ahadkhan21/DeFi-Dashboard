import React, { useState, useRef } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { usePortfolio } from "../../contexts/PortfolioContext";
import ConnectWalletModal from "../wallet/ConnectWalletModal";
import Logo from "./Logo";
import "../../assets/styles/Header.css";

const Header: React.FC = () => {
  const { address, disconnectWallet, connectWallet } = useWallet();
  const { reloadPortfolio } = usePortfolio();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const connectBtnRef = useRef<HTMLButtonElement>(null);

const handleWalletConnect = (addr: string) => {
    connectWallet(addr);
    reloadPortfolio();
    setDropdownOpen(false);
  };

  return (
    <header className="header" style={{ position: "relative" }}>
      <Logo />
      <div className="header-buttons">
        {address ? (
          <>
            <span className="connected-address">{address}</span>
            <button className="button secondary" onClick={disconnectWallet}>
              Disconnect
            </button>
          </>
        ) : (
          <>
            <button
              className="button"
              ref={connectBtnRef}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Connect Wallet
            </button>
            <ConnectWalletModal
              isOpen={dropdownOpen}
              onClose={() => setDropdownOpen(false)}
              anchorRef={connectBtnRef}
              onWalletSelect={handleWalletConnect}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect, useRef } from "react";
import { useWallet } from "../../contexts/WalletContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onWalletSelect: (addr: string) => void;
}

const ConnectWalletModal: React.FC<Props> = ({
  isOpen,
  onClose,
  anchorRef,
  onWalletSelect
}) => {
  const { wallets } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !anchorRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  const anchorRect = anchorRef.current?.getBoundingClientRect();

  const handleConnect = () => {
    if (selectedWallet) {
      onWalletSelect(selectedWallet);
      onClose();
    }
  };

  const left = Math.min(
    anchorRect?.left || 0,
    window.innerWidth - 380
  );

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: (anchorRect?.bottom || 0) + window.scrollY + 8,
        left,
        background: "#1c1c1c",
        border: "1px solid #444",
        borderRadius: "8px",
        padding: "16px",
        zIndex: 1000,
        width: "300px",
      }}
    >
      <h3 className="section-heading" style={{ marginBottom: "10px" }}>
        Select an account
      </h3>
      <p style={{ color: "#aaa", marginBottom: "16px" }}>
        Simulate a wallet connection below:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {wallets.map((w, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedWallet(w.address)}
            style={{
              border: selectedWallet === w.address ? "2px solid #ff007a" : "1px solid #444",
              borderRadius: "8px",
              padding: "12px",
              cursor: "pointer",
              background:
                selectedWallet === w.address
                  ? "rgba(255,0,122,0.1)"
                  : "transparent",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#fff" }}>{w.address}</span>
            <span style={{ color: "#aaa" }}>{w.balanceETH} ETH</span>
          </div>
        ))}
      </div>
      <button
        className="button"
        style={{ marginTop: "16px", width: "100%" }}
        onClick={handleConnect}
        disabled={!selectedWallet}
      >
        Connect Selected Wallet
      </button>
    </div>
  );
};

export default ConnectWalletModal;

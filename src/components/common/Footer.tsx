import React from "react";
import "../../assets/styles/Footer.css";


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} DeFi Dashboard Simulator
    </footer>
  );
};

export default Footer;
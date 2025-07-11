import React, { useRef } from "react";
import logo from "../../assets/images/logo_transparent.png";

const Logo: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = logoRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;

    logoRef.current!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
  };

  const handleMouseLeave = () => {
    if (logoRef.current) {
      logoRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    }
  };

  return (
    <img
      ref={logoRef}
      src={logo}
      alt="DeFi Dashboard Simulator"
      className="header-logo"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        height: "65px",
        transition: "transform 0.1s",
        cursor: "pointer",
      }}
    />
  );
};

export default Logo;

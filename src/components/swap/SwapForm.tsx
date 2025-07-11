import React, { useState } from "react";
import { useTokenData } from "../../contexts/TokenDataContext";
import Button from "../common/Button";

interface Props {
  onSimulate: (fromSymbol: string, toSymbol: string, amount: number) => void;
}

const SwapForm: React.FC<Props> = ({ onSimulate }) => {
  const { tokens } = useTokenData();

  const [tokenFrom, setTokenFrom] = useState<string>("ETH");
  const [tokenTo, setTokenTo] = useState<string>("UNI");
  const [fromAmount, setFromAmount] = useState<string>("");

  const handleSubmit = () => {
    onSimulate(tokenFrom, tokenTo, parseFloat(fromAmount));
  };

  return (
    <>
      <div>
        <label>From Token:</label>
        <select value={tokenFrom} onChange={(e) => setTokenFrom(e.target.value)}>
          {tokens.map((token) => (
            <option key={token.id} value={token.symbol.toUpperCase()}>
              {token.symbol.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To Token:</label>
        <select value={tokenTo} onChange={(e) => setTokenTo(e.target.value)}>
          {tokens.map((token) => (
            <option key={token.id} value={token.symbol.toUpperCase()}>
              {token.symbol.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>From Amount:</label>
        <input
          type="number"
          value={fromAmount}
          onChange={(e) => setFromAmount(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>Simulate Swap</Button>
    </>
  );
};

export default SwapForm;
import React from "react";
import { PoolData } from "../../services/theGraph";

interface Props {
  pool: PoolData;
}

const PoolCard: React.FC<Props> = ({ pool }) => {
  return (
    <div className="bg-white rounded p-4 shadow space-y-2">
      <div className="text-lg font-bold">
        {pool.token0Symbol}/{pool.token1Symbol}
      </div>
      <div className="text-gray-600">
        Reserves: {pool.reserve0.toFixed(2)} {pool.token0Symbol} /
        {pool.reserve1.toFixed(2)} {pool.token1Symbol}
      </div>
      <div className="text-gray-600">
        24h Volume: ${pool.volumeUSD.toLocaleString()}
      </div>
      <div className="text-gray-800 font-semibold">
        TVL: ${pool.totalValueLockedUSD.toLocaleString()}
      </div>
    </div>
  );
};

export default PoolCard;
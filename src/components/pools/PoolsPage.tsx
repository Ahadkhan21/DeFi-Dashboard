import React from "react";
import { useUniswapPools } from "../../hooks/useUniswapPools";
import PoolCard from "./PoolCard";
import "../../assets/styles/Table.css";
import Card from "../common/Card";

const PoolsPage: React.FC = () => {
  const { pools, loading } = useUniswapPools();

  return (
    <Card>
      <h2 className="section-heading">Top Uniswap Pools</h2>
      {loading && <p>Loading pools...</p>}
      {!loading && pools.length === 0 && (
        <p>No pools found. Please try again later.</p>
      )}
      {!loading && pools.length > 0 && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Pair</th>
                <th>Reserves</th>
                <th>24h Volume</th>
                <th>TVL</th>
              </tr>
            </thead>
            <tbody>
              {pools.map((pool) => (
                <tr key={pool.id}>
                  <td>{pool.token0Symbol}/{pool.token1Symbol}</td>
                  <td>
                    {pool.reserve0.toLocaleString()} {pool.token0Symbol} /
                    {` `}
                    {pool.reserve1.toLocaleString()} {pool.token1Symbol}
                  </td>
                  <td>${pool.volumeUSD.toLocaleString()}</td>
                  <td>${pool.totalValueLockedUSD.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
    </Card>
  );
};

export default PoolsPage;

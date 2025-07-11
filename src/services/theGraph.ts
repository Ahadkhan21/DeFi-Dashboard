import axios from "axios";

export interface PoolData {
  id: string;
  token0Symbol: string;
  token1Symbol: string;
  reserve0: number;
  reserve1: number;
  volumeUSD: number;
  totalValueLockedUSD: number;
}

export const fetchTopPools = async (): Promise<PoolData[]> => {
  // const useMockData = true; 

  // if (useMockData) {
    return [
      {
        id: "1",
        token0Symbol: "ETH",
        token1Symbol: "USDC",
        reserve0: 1234.56,
        reserve1: 5678900,
        volumeUSD: 15000000,
        totalValueLockedUSD: 45000000,
      },
      {
        id: "2",
        token0Symbol: "UNI",
        token1Symbol: "ETH",
        reserve0: 22000,
        reserve1: 145,
        volumeUSD: 3200000,
        totalValueLockedUSD: 9800000,
      },
    ];
  // }
  
  // const url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-subgraph";
  // const query = `
  //   {
  //     pools(first: 5, orderBy: totalValueLockedUSD, orderDirection: desc) {
  //       id
  //       token0 { symbol }
  //       token1 { symbol }
  //       reserve0
  //       reserve1
  //       volumeUSD
  //       totalValueLockedUSD
  //     }
  //   }
  // `;

  // const { data } = await axios.post(url, { query });

  // if (data?.data?.pools) {
  //   return data.data.pools.map((p: any) => ({
  //     id: p.id,
  //     token0Symbol: p.token0.symbol,
  //     token1Symbol: p.token1.symbol,
  //     reserve0: parseFloat(p.reserve0),
  //     reserve1: parseFloat(p.reserve1),
  //     volumeUSD: parseFloat(p.volumeUSD),
  //     totalValueLockedUSD: parseFloat(p.totalValueLockedUSD),
  //   }));
  // }
  // return [];
};
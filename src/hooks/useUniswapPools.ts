import { useEffect, useState } from "react";
import { fetchTopPools, PoolData } from "../services/theGraph";

export const useUniswapPools = () => {
  const [pools, setPools] = useState<PoolData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTopPools()
      .then((data) => setPools(data))
      .finally(() => setLoading(false));
  }, []);

  return { pools, loading };
};
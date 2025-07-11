import { useEffect, useState } from "react";
import { HistoricalPrice } from "../types/token";

export const useTokenHistory = (tokenId: string) => {
  const [history, setHistory] = useState<HistoricalPrice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // live API 
        const liveRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=7`
        );

        if (!liveRes.ok) {
          throw new Error(`Coingecko API returned ${liveRes.status}`);
        }

        const liveData = await liveRes.json();
        const mapped = liveData.prices.map(
          ([timestamp, price]: [number, number]) => ({
            timestamp,
            price,
          })
        );
        setHistory(mapped);
      } catch (error) {
        console.warn(
          "Failed to fetch live data. Falling back to local chart data.",
          error
        );

        // Fallback JSON
        const localRes = await fetch("/ethChartData.json");
        const localData = await localRes.json();
        const mapped = localData.prices.map(
          ([timestamp, price]: [number, number]) => ({
            timestamp,
            price,
          })
        );
        setHistory(mapped);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenId]);

  return { history, loading };
};
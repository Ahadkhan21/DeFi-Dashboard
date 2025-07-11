import axios from "axios";

export interface TokenMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export const fetchTokenMarkets = async (
  tokenIds: string[]
): Promise<TokenMarketData[]> => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets`;
    const { data } = await axios.get(url, {
      params: {
        vs_currency: "usd",
        ids: tokenIds.join(","),
      },
    });
    return data;
  } catch (error) {
    console.warn("Coingecko API failed. Loading local token data.", error);

    // Fallback to local JSON file
    const res = await fetch("/tokenPrices.json");
    const tokens = await res.json();
    return tokens;
  }
};

export interface HistoricalPrice {
  timestamp: number;
  price: number;
}

export const fetchHistoricalPrices = async (
  tokenId: string,
  days: number
): Promise<HistoricalPrice[]> => {
  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart`;
  const { data } = await axios.get(url, {
    params: {
      vs_currency: "usd",
      days,
    },
  });

  return data.prices.map(([timestamp, price]: [number, number]) => ({
    timestamp,
    price,
  }));
};

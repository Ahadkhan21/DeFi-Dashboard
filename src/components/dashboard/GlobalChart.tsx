import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTokenHistory } from "../../hooks/useTokenHistory";

const GlobalChart: React.FC = () => {
  const { history, loading } = useTokenHistory("ethereum");

  const chartData = history.map((point) => ({
    date: new Date(point.timestamp).toLocaleDateString(),
    price: point.price,
  }));

  if (loading) return <p>Loading chart...</p>;

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="text-lg ft-bold mbon-2">ETH Price Trend (7 days)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GlobalChart;
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../assets/styles/Card.css";

export interface ChartProps {
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
  height?: number;
  title?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  xKey,
  yKey,
  height = 200,
  title,
}) => {
  return (
    <div className="card" style={{background: "#1e1e1e", borderRadius: "12px", padding: "24px", border: "1px solid #333333"}}>
      {title && <h3 className="section-heading">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={yKey} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
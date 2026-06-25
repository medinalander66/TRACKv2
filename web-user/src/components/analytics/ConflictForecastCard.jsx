import React from "react";
import { LocationOn } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import styles from "../../styles/components/analytics/ConflictForecastCard.module.css";

const conflictTrendData = [
  { day: "Monday", actual: 32, predicted: 28 },
  { day: "Tuesday", actual: 28, predicted: 30 },
  { day: "Wednesday", actual: 36, predicted: 34 },
  { day: "Thursday", actual: 30, predicted: 32 },
  { day: "Friday", actual: 42, predicted: 38 },
  { day: "Saturday", actual: 26, predicted: 24 },
  { day: "Sunday", actual: 22, predicted: 20 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className={styles.tooltipContainer}>
      <div className={styles.tooltipLabel}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipName}>{entry.name}</span>
          <span className={styles.tooltipValue}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ConflictForecastCard({
  title = "Conflict Venue Trend",
  subtitle = "Actual vs Predicted Conflict Counts",
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleRow}>
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={330}>
          <BarChart
            data={conflictTrendData}
            margin={{ top: 8, right: 18, left: 0, bottom: 6 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(59, 130, 246, 0.08)" }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" />
            <Bar
              dataKey="actual"
              name="Actual"
              fill="#2563eb"
              radius={[12, 12, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="predicted"
              name="Predicted"
              fill="#f97316"
              radius={[12, 12, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

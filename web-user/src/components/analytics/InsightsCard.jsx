import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "../../styles/components/analytics/Insights.module.css";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WarningIcon from "@mui/icons-material/Warning";
const trendData = [
  { day: "Mon", conflictCount: 8 },
  { day: "Tue", conflictCount: 6 },
  { day: "Wed", conflictCount: 11 },
  { day: "Thu", conflictCount: 9 },
  { day: "Fri", conflictCount: 14 },
  { day: "Sat", conflictCount: 10 },
  { day: "Sun", conflictCount: 7 },
];

export default function InsightsCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2>Conflict Insights</h2>
          <p>Summary of venue conflict forecasts and risk indicators.</p>
        </div>
      </div>

      <div className={styles.trendChart}>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart
            data={trendData}
            margin={{ top: 12, right: 10, left: 0, bottom: 6 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#475569", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
            />
            <Line
              type="monotone"
              dataKey="conflictCount"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Total Conflict</span>
          <strong>68</strong>
          <p>Last 4 weeks</p>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Forecast</span>
          <strong>75</strong>
          <p>22%</p>
          <p>Last 4 weeks</p>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Peak Day</span>
          <strong>8</strong>
          <p>Friday</p>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>
            <WarningIcon className={styles.icon} />
            <h3>High Risk Alert</h3>
          </div>

          <p>High risk on Monday: 8 conflicts predicted.</p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>
            <LightbulbIcon className={styles.icon} />
            <h3>Recommendation</h3>
          </div>
          <p>
            Recommend reviewing venue allocations and confirming backup rooms
            before Friday.
          </p>
        </div>
      </div>
    </div>
  );
}

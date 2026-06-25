import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import styles from "../../styles/components/analytics/AnalyticsCard.module.css";

const eventData = [
  { status: "Total", value: 132 },
  { status: "Pending", value: 24 },
  { status: "Declined", value: 14 },
  { status: "Missed", value: 7 },
];

// Map each status to a color
const colorMap = {
  Total: "#1d4ed8",
  Pending: "#FFA500",
  Declined: "#FF4444",
  Missed: "#888888",
};

const valueColorClass = {
  Total: styles.valueTotal,
  Pending: styles.valuePending,
  Declined: styles.valueDeclined,
  Missed: styles.valueMissed,
};

const statusDotClass = {
  Total: styles.dotTotal,
  Pending: styles.dotPending,
  Declined: styles.dotDeclined,
  Missed: styles.dotMissed,
};

export default function BarCard({ title = "Campus Events" }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={eventData}>
            {/* Add grid lines here */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              vertical={false}
            />

            <XAxis dataKey="status" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis allowDecimals={false} tickLine={false} />
            <Tooltip
              trigger="hover"
              formatter={(value) => value}
              labelFormatter={(label) => `Status: ${label}`}
            />

            <Bar dataKey="value" barSize={90} radius={[10, 10, 0, 0]}>
              {eventData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorMap[entry.status]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.statList}>
        {eventData.map((item) => (
          <div key={item.status} className={styles.statItem}>
            <div className={styles.statLabelRow}>
              <span
                className={`${styles.statDot} ${statusDotClass[item.status]}`}
              />
              <span className={styles.statLabel}>{item.status}</span>
            </div>
            <span
              className={`${styles.statValue} ${valueColorClass[item.status]}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

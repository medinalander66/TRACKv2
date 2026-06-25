import React from "react";
import BottomNav from "../components/layout/BottomNav";
import TopNav from "../components/layout/TopNav";
import BarCard from "../components/analytics/BarCard";
import styles from "../styles/pages/Analytics.module.css";

function Analytics() {
  const handleMenuClick = () => {
    console.log("Analytics menu clicked");
  };

  const handleNotificationClick = () => {
    console.log("Analytics notification clicked");
  };

  const handleProfileClick = () => {
    console.log("Analytics profile clicked");
  };

  return (
    <div className={styles.page}>
      <TopNav
        variant="analytics"
        title="Analytics"
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      <main className={styles.content}>
        <div className={styles.insightsSection}>
            <h2>Insight</h2>
            <p>Analytics & Performance</p>
        </div>
        <BarCard />
      </main>

      <BottomNav />
    </div>
  );
}

export default Analytics;

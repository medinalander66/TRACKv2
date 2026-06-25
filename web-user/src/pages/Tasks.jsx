import React, { useState } from "react";
import TopNav from "../components/layout/TopNav";
import BottomNav from "../components/layout/BottomNav";
import SearchBar from "../components/common/SearchBar";
import styles from "../styles/pages/Tasks.module.css";
import FilterSection from "../components/common/FilterSection";

function Tasks() {
  const statusOptions = [
    { label: "Pending", value: "pending", notification: 4 },
    { label: "Completed", value: "completed", notification: 2 },
  ];

  const [status, setStatus] = useState("pending");

  const handleMenuClick = () => {
    console.log("Tasks menu clicked");
  };

  const handleNotificationClick = () => {
    console.log("Tasks notification clicked");
  };

  const handleProfileClick = () => {
    console.log("Tasks profile clicked");
  };

  return (
    <div className={styles.container}>
      <TopNav
        variant="tasks"
        title="Tasks"
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />
      <div className={styles.content}>
        <SearchBar
          placeholder="Search tasks..."
          searchInputClassName={styles.searchBarInput}
        />

        <FilterSection
          containerClassName={styles.filterStatusSection}
          buttonsClassName={styles.filterButtonsSection}
          options={statusOptions}
          mode="single"
          selected={status}
          onChange={setStatus}
          showNotification={true}
        />


      </div>

      <BottomNav active="tasks" />
    </div>
  );
}

export default Tasks;

import React, { useState } from "react";
import TopNav from "../components/layout/TopNav";
import BottomNav from "../components/layout/BottomNav";
import SearchBar from "../components/common/SearchBar";
import styles from "../styles/pages/Tasks.module.css";
import FilterSection from "../components/common/FilterSection";
import TaskCard from "../components/tasks/TaskCard";
import FilterButtons from "../components/common/FilterButtons";
import FilterDate from "../components/common/FilterDate";

function Tasks() {
  const statusOptions = [
    { label: "Pending", value: "pending", notification: 4 },
    { label: "Completed", value: "completed", notification: 2 },
  ];

  const filterOptions = [
    { id: "all", label: "All Tasks" },
    { id: "personal", label: "Personal Tasks" },
    { id: "campus", label: "Campus Tasks" },
    { id: "department", label: "Department Tasks" },
    { id: "high", label: "High Priority" },
    { id: "medium", label: "Medium Priority" },
    { id: "low", label: "Low Priority" },
  ];

  const [status, setStatus] = useState("pending");
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    day: "",
    year: "",
  });
  const [sortOrder, setSortOrder] = useState("ascending");

  const handleMenuClick = () => {
    console.log("Tasks menu clicked");
  };

  const handleNotificationClick = () => {
    console.log("Tasks notification clicked");
  };

  const handleProfileClick = () => {
    console.log("Tasks profile clicked");
  };

  const handleFilterChange = (selectedIds) => {
    setSelectedFilters(new Set(selectedIds));
    console.log("Selected filters:", selectedIds);
  };

  const handleDateChange = (dateObj) => {
    setSelectedDate(dateObj);
    console.log("Date selected:", dateObj);
  };

  const handleOrderChange = (order) => {
    setSortOrder(order);
    console.log("Sort order:", order);
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
        <div className={styles.filterButtonsWrapper}>
          <FilterButtons
            options={filterOptions}
            onSelectionChange={handleFilterChange}
            multiSelect={true}
          />
        </div>

        <div className={styles.taskList}>
          <div className={styles.filterDateContainer}>
            <h3 className={styles.title}>Tasks</h3>
            <div className={styles.filterDate}>
              <FilterDate
                onDateChange={handleDateChange}
                onOrderChange={handleOrderChange}
              />
            </div>
          </div>

          <div className={styles.taskCardsContainer}>
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </div>
      </div>

      <BottomNav active="tasks" />
    </div>
  );
}

export default Tasks;

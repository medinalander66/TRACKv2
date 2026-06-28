import React, { useState } from "react";
import styles from "../../styles/components/common/FilterDate.module.css";

function FilterDate({ onDateChange = () => {}, onOrderChange = () => {} }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [order, setOrder] = useState("ascending");

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    onDateChange({ month: newMonth, day, year });
  };

  const handleDayChange = (e) => {
    const newDay = e.target.value;
    setDay(newDay);
    onDateChange({ month, day: newDay, year });
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    onDateChange({ month, day, year: newYear });
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    onOrderChange(newOrder);
  };

  return (
    <div className={styles.filterDateContainer}>
      <div className={styles.dateSection}>
        <select
          value={month}
          onChange={handleMonthChange}
          className={styles.dropdown}
        >
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          value={day}
          onChange={handleDayChange}
          className={styles.dropdown}
        >
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={handleYearChange}
          className={styles.dropdown}
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y.value} value={y.value}>
              {y.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.orderSection}>
        <select
          value={order}
          onChange={handleOrderChange}
          className={styles.dropdown}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default FilterDate;

import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "../../styles/components/tasks/TaskCard.module.css";

function calculateProgress(assignments = []) {
  if (!Array.isArray(assignments) || assignments.length === 0) return 0;
  const doneCount = assignments.filter(
    (item) => item?.status?.toLowerCase() === "done"
  ).length;
  return Math.round((doneCount / assignments.length) * 100);
}

function formatVisibility(value) {
  if (!value) return "Personal";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function TaskCard({
  task = {},
  name = "task-selection",
  selected = false,
  onSelect = () => {},
}) {
  const progress = calculateProgress(task.assignments || task.subtasks || []);
  const priority = (task.priority || "medium").toLowerCase();

  return (
    <div className={styles.card}>
      <div className={styles.prioritySection}>
        <span className={`${styles.priorityLabel} ${styles[priority]}`}>
          {priority === "high"
            ? "High"
            : priority === "low"
            ? "Low"
            : "Medium"}
        </span>
      </div>

      <div className={styles.headerRow}>
        <label className={styles.radioTitle}>
          <input
            type="radio"
            name={name}
            checked={selected}
            onChange={onSelect}
            className={styles.radioInput}
          />
          <span className={styles.title}>{task.title || "Untitled Task"}</span>
        </label>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <VisibilityIcon className={styles.infoIcon} />
          <span>{formatVisibility(task.visibility)}</span>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <DescriptionIcon className={styles.infoIcon} />
          <span>{task.description || "No description provided."}</span>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.dateSection}>
          <DateRangeIcon className={styles.infoIcon} />
          <span>
            {task.dateRange || (task.startDate || "—") + " → " + (task.endDate || "—")}
          </span>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.timeSection}>
          <AccessTimeIcon className={styles.infoIcon} />
          <span>
            {task.timeRange || (task.startTime || "—") + " → " + (task.endTime || "—")}
          </span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressLabelRow}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressValue}>{progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

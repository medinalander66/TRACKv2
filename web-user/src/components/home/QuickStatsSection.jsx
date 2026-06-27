import SectionTitle from "../common/SectionTitle";
import styles from "../../styles/components/home/QuickStatsSection.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const QuickStatsSection = () => {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsTitle}>
        <SectionTitle heading="Quick Stats" highlight="Campus Events" />
        <div className={styles.statsButtons}>
          <button className={styles.statsButtonIcon}>
            <ArrowBackIosNewIcon />
          </button>
          <button className={styles.statsButtonIcon}>
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      <div className={styles.statsFilterSection}>
        <div className={styles.statsFilterButtons}>
          <button className={styles.statsFilterButton}>All</button>
          <button className={styles.statsFilterButton}>Today</button>
          <button className={styles.statsFilterButton}>This Week</button>
          <button className={styles.statsFilterButton}>This Month</button>
        </div>
        <a href="/analytics" className={styles.statsFilterLink}>
          View Analytics
        </a>
      </div>
    </div>
  );
};

export default QuickStatsSection;

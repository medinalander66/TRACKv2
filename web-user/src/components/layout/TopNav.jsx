import styles from "../../styles/components/layout/TopNav.module.css";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { MdArrowBack } from "react-icons/md";

const defaultTitles = {
  home: "TRACK",
  analytics: "Analytics",
  calendar: "Calendar",
  tasks: "Tasks",
  notifications: "Notifications",
};

export default function TopNav({
  variant = "nav",
  title,
  onBack,
  onSave,
  onMenuClick,
  onNotificationClick,
  onProfileClick,
}) {
  const isCreateEdit = variant === "create" || variant === "edit";
  const navTitle = title ?? defaultTitles[variant] ?? "";

  if (!isCreateEdit) {
    return (
      <nav className={styles.topNav}>
        <div className={styles.leftSideContainer}>
          <button className={styles.iconButton} onClick={onMenuClick}>
            <FiMenu />
          </button>
          <h2 className={styles.title}>{navTitle}</h2>
        </div>

        <div className={styles.rightSideContainer}>
          <button className={styles.iconButton} onClick={onNotificationClick}>
            <FiBell />
          </button>
          <button className={styles.iconButton} onClick={onProfileClick}>
            <FiUser />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.topNav}>
      <div className={styles.leftSideContainer}>
        <button className={styles.iconButton} onClick={onBack}>
          <MdArrowBack />
        </button>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.rightSideContainer}>
        <button className={styles.iconButton} onClick={onSave}>
          Save
        </button>
      </div>
    </nav>
  );
}

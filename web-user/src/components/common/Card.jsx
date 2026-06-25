import styles from "../../styles/components/common/card.module.css";

export default function Card({ className = "", children, ...props }) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
}

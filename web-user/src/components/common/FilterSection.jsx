import React from "react";
import styles from "../../styles/components/common/FilterSection.module.css";

export default function FilterSection({
  label,
  options = [],
  mode = "single", // "single" | "multi"
  selected,
  onChange,
  includeSelectAll = false, // only relevant for multi mode
  showNotification = false, // show notification badge when option.notification is provided
  containerClassName = "",
  buttonsClassName = "",
}) {
  const handleClick = (value) => {
    if (mode === "single") {
      onChange && onChange(value);
      return;
    }

    // multi
    const current = Array.isArray(selected) ? [...selected] : [];
    const idx = current.indexOf(value);
    if (idx === -1) current.push(value);
    else current.splice(idx, 1);
    onChange && onChange(current);
  };

  const handleSelectAll = () => {
    if (!Array.isArray(selected) || selected.length < options.length) {
      const all = options.map((o) => o.value);
      onChange && onChange(all);
    } else {
      onChange && onChange([]);
    }
  };

  const isActive = (opt) => {
    return mode === "single"
      ? selected === opt
      : Array.isArray(selected) && selected.includes(opt);
  };

  return (
    <div className={`${styles.container} ${containerClassName}`}>
      {label && <div className={styles.label}>{label}</div>}

      <div className={`${styles.buttons} ${buttonsClassName}`}>
        {includeSelectAll && mode === "multi" && (
          <button
            type="button"
            className={`${styles.button} ${Array.isArray(selected) && selected.length === options.length ? styles.active : ""}`}
            onClick={handleSelectAll}
          >
            All
          </button>
        )}

        {options.map((opt) => {
          const active = isActive(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              className={`${styles.button} ${active ? styles.active : ""}`}
              onClick={() => handleClick(opt.value)}
            >
              <span className={styles.text}>{opt.label}</span>
              {showNotification && opt.notification ? (
                <span className={styles.badge}>
                  {typeof opt.notification === "number" ? opt.notification : ""}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

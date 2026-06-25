import styles from "../../styles/components/common/RadioGroup.module.css";

export default function RadioGroup({ label, name, options, value, onChange, className, optionsClassName, radioLabelClassName }) {
  return (
    <div className={`${styles.group} ${className || ""}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={`${styles.options} ${optionsClassName || className || ""}`}>
        
        {options.map((opt) => (
          <label key={opt.value} className={`${styles.radioLabel} ${radioLabelClassName || className || ""}`}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
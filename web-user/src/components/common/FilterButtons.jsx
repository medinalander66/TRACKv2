import React, { useState } from "react";
import styles from "../../styles/components/common/FilterButtons.module.css";

function FilterButtons({
  options = [],
  onSelectionChange = () => {},
  multiSelect = true,
}) {
  const [selected, setSelected] = useState(new Set());

  const handleButtonClick = (optionId) => {
    let updatedSelected = new Set(selected);

    if (multiSelect) {
      if (updatedSelected.has(optionId)) {
        updatedSelected.delete(optionId);
      } else {
        updatedSelected.add(optionId);
      }
    } else {
      updatedSelected.clear();
      updatedSelected.add(optionId);
    }

    setSelected(updatedSelected);
    onSelectionChange(Array.from(updatedSelected));
  };

  return (
    <div className={styles.buttonContainer}>
      {options.map((option) => (
        <button
          key={option.id}
          className={`${styles.filterButton} ${
            selected.has(option.id) ? styles.active : ""
          }`}
          onClick={() => handleButtonClick(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;

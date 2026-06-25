import React from 'react';
import styles from '../../styles/components/common/SectionTitle.module.css';

const SectionTitle = ({ heading = 'Quick Stats', highlight = 'Campus Events' }) => {
  return (
    <div className={styles['section-title']}>
      <div>
        <h1>
          {heading} <span className={styles['section-title-highlight']}>{highlight}</span>
        </h1>
      </div>
    </div>
  );
};

export default SectionTitle;

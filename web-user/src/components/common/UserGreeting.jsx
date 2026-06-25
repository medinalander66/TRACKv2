import React from 'react';
import styles from '../../styles/components/common/UserGreeting.module.css';

const UserGreeting = ({ name = 'Guest', role = 'official', department = 'CICS', functionalRole ='Dean' }) => {
  return (
    <div className={styles['user-greeting']}>
      <div>
        <h1>
          Welcome, <span className={styles['user-greeting-name']}>{name}</span>!
        </h1>
      </div>

      {(role || department) && (
        <div>
          <p>
            {role}
            {role && department ? ' | ' : ''}
            <span>{department}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserGreeting;

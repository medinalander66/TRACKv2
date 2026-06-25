import React from 'react';
import UserGreeting from '../common/UserGreeting';
import QuickStatsSection from './QuickStatsSection';

export default function OfficialsHome() {
  return (
    <div>
      <UserGreeting name="Shiela Marie Garcia" role="Dean" department="CICS Department" />
      <QuickStatsSection/>
    </div>
  );
}

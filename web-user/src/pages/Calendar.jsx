import React from "react";
import TopNav from "../components/layout/TopNav";

export default function Calendar() {
  const handleMenuClick = () => {
    console.log("Calendar menu clicked");
  };

  const handleNotificationClick = () => {
    console.log("Calendar notification clicked");
  };

  const handleProfileClick = () => {
    console.log("Calendar profile clicked");
  };

  return (
    <div>
      <TopNav
        variant="calendar"
        title="Calendar"
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />
      <div>Calendar Page</div>
    </div>
  );
}

import React from "react";
import TopNav from "../components/layout/TopNav";

export default function Notifications() {
  const handleMenuClick = () => {
    console.log("Notifications menu clicked");
  };

  const handleNotificationClick = () => {
    console.log("Notifications notification clicked");
  };

  const handleProfileClick = () => {
    console.log("Notifications profile clicked");
  };

  return (
    <div>
      <TopNav
        variant="notifications"
        title="Notifications"
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />
      <div>Notifications</div>
    </div>
  );
}

import { useAuth } from "../context/AuthContext";
import TopNav from "../components/layout/TopNav";
import StaffHome from "../components/home/StaffHome";
import OfficialsHome from "../components/home/OfficialsHome";
import FacultyHome from "../components/home/FacultyHome";
import BottomNav from "../components/layout/BottomNav";
import styles from '../styles/pages/HomePage.module.css';

export default function HomePage() {
  const { user } = useAuth();
  const role = user?.role;

  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const renderHome = () => {
    switch (role) {
      case "staff":
        return <StaffHome />;
      case "official":
        return <OfficialsHome />;
      case "faculty":
        return <FacultyHome />;
      default:
        return <StaffHome />; // fallback
    }
  };

  return (
    <div className={styles.container}>
      <TopNav
        variant="home"
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      <div className={styles.content}>
        {renderHome()}
      </div>

      <BottomNav />
    </div>
  );
}
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { FiHome, FiCalendar, FiCheckSquare, FiMapPin, FiBarChart2 } from "react-icons/fi";
import styles from "../../styles/components/layout/BottomNav.module.css";

export default function BottomNav() {
  const { user } = useAuth();
  const role = user?.role;

  // Define role‑specific navigation items
  const getNavItems = () => {
    const commonItems = [
      { path: "/", label: "Home", icon: FiHome },
      { path: "/Calendar", label: "Calendar", icon: FiCalendar },
      { path: "/Tasks", label: "Tasks", icon: FiCheckSquare },
      { path: "/Analytics", label: "Analytics", icon: FiBarChart2 }
    ];

    if (role === "staff") {
      return [
        { path: "/", label: "Home", icon: FiHome },
        { path: "/venues", label: "Venues", icon: FiMapPin },      // staff manage venues
        { path: "/Calendar", label: "Calendar", icon: FiCalendar },
        { path: "/Tasks", label: "Tasks", icon: FiCheckSquare }
      ];
    }

    if (role === "official") {
      return [
        { path: "/", label: "Home", icon: FiHome },
        { path: "/Calendar", label: "Calendar", icon: FiCalendar },
        { path: "/Tasks", label: "Tasks", icon: FiCheckSquare },
        { path: "/Analytics", label: "Analytics", icon: FiBarChart2 }      // officials have admin-like manage
      ];
    }

    if (role === "faculty") {
      return [
        { path: "/", label: "Home", icon: FiHome },
        { path: "/Calendar", label: "Calendar", icon: FiCalendar },
        { path: "/Tasks", label: "Tasks", icon: FiCheckSquare },
        { path: "/Analytics", label: "Analytics", icon: FiBarChart2 }
      ];
    }

    // fallback (no role) – same as faculty
    return commonItems;
  };

  const items = getNavItems();

  return (
    <nav className={styles.bottomNav}>
      {items.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            <Icon className={styles.icon} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
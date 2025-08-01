import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./Sidebar.module.css";
import { FaBoxOpen, FaPlus, FaThList, FaUserShield } from "react-icons/fa";

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};


const Sidebar: React.FC <SidebarProps> = ( {isOpen, toggleSidebar} ) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Admin Panel</h2>

      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${isActive("/dashboard") ? styles.active : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <FaThList className={styles.icon} />
          Dashboard
        </li>

        <li
        className={`${styles.menuItem} ${isActive("/dashboard/authenticatedUsers") ? styles.active : ""}`}
        onClick={() => navigate("/dashboard/authenticatedUsers")}
        >
            <FaUserShield className={styles.icon} />
            Admin

        </li>

        <li
          className={`${styles.menuItem} ${isActive("/dashboard/adddashboardproduct") ? styles.active : ""}`}
          onClick={() => navigate("/dashboard/adddashboardproduct")}
        >
          <FaPlus className={styles.icon} />
          Add Product
        </li>

        <li
          className={`${styles.menuItem} ${isActive("/dashboard/adddashboardcategory") ? styles.active : ""}`}
          onClick={() => navigate("/dashboard/adddashboardcategory")}
        >
          <FaBoxOpen className={styles.icon} />
          Add Category
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

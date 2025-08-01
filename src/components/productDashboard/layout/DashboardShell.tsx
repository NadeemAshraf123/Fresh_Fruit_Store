import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import styles from "./DashboardShell.module.css";

const DashboardShell: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.container}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main 
                className={`${styles.mainContent} ${!isSidebarOpen ? styles.mainContentFull : ''}`}
            >
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardShell;
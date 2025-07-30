import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.logo}> A Akademi</h2>

            <ul className={styles.navList}>
                <li><NavLink to="/dashboard" activeClassName={styles.active}>Dashboard </NavLink> </li>
                <li><NavLink to="/products" activeClassName={styles.active}>Products </NavLink> </li>
                <li><NavLink to="/add-product" activeClassName={styles.active}>Add Product </NavLink> </li>
                <li><NavLink to="/add-product-category" activeClassName={styles.active}>Add <Category></Category> </NavLink> </li>

            </ul>
        </div>
    );
};
export default Sidebar;
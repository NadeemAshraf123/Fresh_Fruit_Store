// src/components/ProductDashboard/ProductDashboard.tsx
import React from 'react';
import styles from './ProductDashboard.module.css';
import ProductTableHeader from './ProductTableHeader';
import ProductRow from './ProductRow';
import { dummyProducts } from './DummyData';

const ProductDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Top header section */}
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Products</h2>

        <div className={styles.controls}>
          <select className={styles.sortSelect}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          <button className={styles.addButton}>+ New Product</button>
        </div>
      </div>

      {/* Search input */}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search here..." className={styles.searchInput} />
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <ProductTableHeader />

        {dummyProducts.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDashboard;

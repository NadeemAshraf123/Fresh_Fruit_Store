import React, { useEffect, useState } from 'react';
import styles from './ProductsDisplay.module.css';

interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  categories: string[];
  isFeatured: boolean;
}

const ProductsDisplay: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAllFeatured, setShowAllFeatured] = useState(false);

  useEffect(() => {
    const productsJSON = localStorage.getItem('products');
    const parsed = productsJSON ? JSON.parse(productsJSON) : [];
    setProducts(parsed);
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured);

  const chunkedFeatured: Product[][] = [];
  for (let i = 0; i < featuredProducts.length; i += 4) {
    chunkedFeatured.push(featuredProducts.slice(i, i + 4));
  }

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#388e3c" }}>Product Display</h1>

      <button onClick={() => setShowAllFeatured(true)} className={styles.allButton}>
         All 
      </button>

      {showAllFeatured && chunkedFeatured.map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {row.map(product => (
            <div className={styles.productCard} key={product.id}>
              <img src={product.images?.[0]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default ProductsDisplay;

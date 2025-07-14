import React from 'react';
import styles from './ProductsDisplay.module.css';

interface Product {
  name: string;
  image: string;
  category: 'fruit' | 'vegetable';
  price: string;
  isFeatured?: boolean; 
}

const ProductsDisplay: React.FC = () => {

  
  const productsJSON = localStorage.getItem('products');
  const products: Product[] = productsJSON ? JSON.parse(productsJSON) : [];
  console.log("ProductsJSON for display" , products);


  function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}


const fruits = products.filter(p => p.category === 'fruit');
const vegetables = products.filter(p => p.category === 'vegetable');

const featuredFruits = fruits.filter(p => p.isFeatured);
const unfeaturedFruits = fruits.filter(p => !p.isFeatured);

const featuredVegetables = vegetables.filter(p => p.isFeatured);
const unfeaturedVegetables = vegetables.filter(p => !p.isFeatured);



  const renderDynamicRow = (items: Product[], title: string) => {
  const chunkedRows = chunkArray(items, 4);
  return (
    <>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
      </div>
      <div className={styles.outerContainer}>
      <div className={styles.contentWrapper}>
      {chunkedRows.map((rowItems, rowIndex) => (
        <div className={styles.cardRow} key={`${title}-row-${rowIndex}`}>
          {rowItems.map((product, index) => (
            <div className={styles.card} key={`${title}-${rowIndex}-${index}`}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p className={styles.prices}>
                <span className={styles.new}>{product.price}</span>
              </p>
            </div>
          ))}
        </div>
      ))}
      </div>
      </div>
    </>
  );
};



  return (
    <section className={styles.wrapper}>
     
      {featuredFruits.length > 0 && renderDynamicRow(featuredFruits, 'Featured Fruits')}


      
      <div className={styles.sectionHeader}>
        <h2>Featured Product</h2>
        <div className={styles.filters}>
          <a href="#">ALL</a>
          <a href="#">ORANGES</a>
          <a href="#">FRESH MEAT</a>
          <a href="#">VEGETABLES</a>
          <a href="#">FASTFOOD</a>
        </div>
      </div>

{featuredVegetables.length > 0 && renderDynamicRow(featuredVegetables, 'Featured Vegetables')}


{unfeaturedFruits.length > 0 && renderDynamicRow(unfeaturedFruits, 'Fruit Products')}
{unfeaturedVegetables.length > 0 && renderDynamicRow(unfeaturedVegetables, 'Vegetable Products')}

    </section>
  );
};

export default ProductsDisplay;

import React from 'react';
import styles from './MainSection.module.css';
// import FeatureCards from './FeaturesCards';

const MainSection = () => {
  return (
    <>
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textArea}>
          <p className={styles.subTitle}>Fresh Fresh Orange Lemon</p>
          <h1 className={styles.price}>$14.00 <span>/ package</span></h1>
          <button className={styles.shopBtn}>Shop Now</button>
        </div>
        <div className={styles.imageArea}>
          {/* <img src="my-app/src/assets/main.jpg" alt="Fresh Basket" /> */}

        </div>
      </div>
    </section>

</>
    
  );
};

export default MainSection;



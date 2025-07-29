import React from 'react';
import styles from './Home.module.css';
import main from '../../assets/fruits/main.jpg';

const Home = () => {
  return (
    <>
    <section className={styles.hero} style={{ backgroundImage: `url(${main})` }}>
      <div className={styles.heroContent}>
        <div className={styles.textArea}>
          <p className={styles.subTitle}>Fresh Orange Lemon Juice</p>
          <h1 className={styles.price}>$14.00 <span>/ package</span></h1>
          <button className={styles.shopBtn}>Shop Now</button>
        </div>
        <div className={styles.imageArea}>

        </div>
      </div>
    </section>

</>
    
  );
};

export default Home;



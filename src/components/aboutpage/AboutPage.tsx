import React from 'react';
import styles from './AboutPage.module.css';
import bgImage from '../../assets/backgroundimages/NEW.jpg';

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      
      <section
      style={{ backgroundImage: `url(${bgImage})`,
              //  backgroundRepeat: 'no-repeat', 
              //  backgroundSize: 'cover',
              //  backgroundPosition:'center'
               }}
      className={styles.heroBanner}>
        {/* <div className={styles.heroOverlay}>
          <h1>Our Story</h1>
        </div> */}
      </section>

    
      <section className={styles.storySection}>
        <div className={styles.storyImage}></div>
        <div className={styles.storyContent}>
          <h2>Fresh Store Origins</h2>
          <p>
            Fresh Store was born from a passion for bringing farm-fresh produce directly to your kitchen. 
            Founded in 2020, we started as a small local market and have grown into your trusted online source 
            for the freshest organic products.
          </p>
          <p>
            Our journey began with a simple mission: to make healthy, fresh foods accessible to everyone 
            without compromising on quality or taste. Every product in our store is carefully selected 
            from trusted local farmers and producers.
          </p>
          <button className={styles.learnMoreBtn}>Learn More</button>
        </div>
      </section>

    
      <section className={styles.valuesSection}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🍃</div>
            <h3>Organic</h3>
            <p>We source only the freshest organic products from trusted local farmers.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🚚</div>
            <h3>Fast Delivery</h3>
            <p>We deliver your fresh products within 24 hours to ensure maximum freshness.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>❤️</div>
            <h3>Customer Care</h3>
            <p>Your satisfaction is our priority with 24/7 support and easy returns.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
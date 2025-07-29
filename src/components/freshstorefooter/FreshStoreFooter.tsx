import React from 'react';
import { Link} from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from  "react-icons/fa";
import styles from './FooterStore.module.css';

const FreshStoreFooter = () => {
  return (

    <footer className={styles.footer}>
      <div className={styles.footer_container}>

        <div className={styles.footer_section}>
          <h3 className={styles.tittle}> Fresh Store</h3>
          <p className={styles.footer_text}> 
            Bringing you the freshest fruits, vegetables, and more -- straight to your door.
          </p>
        </div>


          <div className={styles.footer_section}>
            <h4 className={styles.footer_subtitle}> Quick Link </h4>
            <ul className={styles.footer_list}>
              <li className={styles.footer_list_items} > <Link to="/"> Home     </Link> </li> 
              <li className={styles.footer_list_items} > <Link to="/shop"> Shop     </Link> </li>
              <li className={styles.footer_list_items} > <Link to="/about"> About Us </Link> </li>
              <li className={styles.footer_list_items} > <Link to="/contact"> Contact  </Link> </li>
            </ul>
          </div>

          <div className={styles.footer_section}>
            <h4 className={styles.footer_subtitle}> Customer Services</h4>
            <ul className={styles.footer_list}>
              <li> <Link to=""> FAQs                   </Link></li>                           
              <li> <Link to=""> Shipping & Returns     </Link></li>
              <li> <Link to=""> Order Tracking         </Link></li>
              <li> <Link to=""> Support                </Link></li>
            </ul>
          </div>

          <div className={styles.footer_section}>
            <h4 className={styles.footer_subtitle}> Contact Us</h4>
            <p className={styles.footer_text}> Email: support@freshstore.com</p>
            <p className={styles.footer_text}> Phone: +92 300 1234567</p>
            <div className={styles.social_icons}>
              <span>   <Link to="" >   <FaFacebookF />     </Link>   </span>
              <span>   <Link to="" >   <FaInstagram />    </Link>   </span>
               <span>  <Link to="" >    <FaTwitter  />    </Link>   </span>                
            </div>
          </div>
      </div>

      <div className={styles.footer_bottom}>
        &copy {new Date().getFullYear()} Fresh Store. All rights reserved.
      </div>
    </footer>
    
  )
}

export default FreshStoreFooter
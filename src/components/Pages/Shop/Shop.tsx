import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ShopProductDisplay.module.css';


const Shop = () => {
  const location = useLocation();
  const selectedFromHome = location.state?.selectedCategory?.name?.toLowerCase() || "all";
  const [activeCategory, setActiveCategory] = useState(selectedFromHome);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    try {
      const fetchedProducts = localStorage.getItem('products');
      const JSONProducts = fetchedProducts ? JSON.parse(fetchedProducts) : [];
      setProducts(JSONProducts);

      const extractedCategories = JSONProducts.reduce((acc: string[], product) => {
        const categoryName = product.category?.name || 
                          (product.category || "").toString().split(" | ")[1]?.trim();
        if (categoryName && !acc.includes(categoryName.toLowerCase())) {
          acc.push(categoryName.toLowerCase());
        }
        return acc;
      }, []);

      setCategories(["All", ...extractedCategories]);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }, []);

  const handleFilter = (category: string) => {
    setActiveCategory(category.toLowerCase());
  };

  const currentProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => {
        const productCategory = product.category?.name || 
                              (product.category || "").toString().split(" | ")[1]?.trim();
        return productCategory?.toLowerCase() === activeCategory;
      });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

       <h6 className={styles.fadeheading} 
       style={{ marginBottom: '15px', textTransform: 'capitalize',textAlign:'center',color: 'darkgreen' }}>
          {activeCategory} ({currentProducts.length})
        </h6>


      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Product's Display</h1>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleFilter(category)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '20px', 
              border: 'none', 
              background: activeCategory === category.toLowerCase() ? '#ddd' : '#f0f0f0', 
              cursor: 'pointer', 
              fontWeight: 'bold', 
              textTransform: 'capitalize'
            }}
          >
            {category}
          </button>
        ))}
      </div>
    
      <div style={{ marginBottom: '40px' }}>
        {/* <h2 style={{ marginBottom: '15px', textTransform: 'capitalize' }}>
          {activeCategory} ({currentProducts.length})
        </h2> */}
        
        <div style={{  
          display: 'grid',  
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',  
          gap: '20px', 
          justifyContent: 'center'
        }}>
          {currentProducts.map((product, index) => (
            <div 
              key={index} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <img 
                src={product.images?.[0]} 
                alt={product.name} 
                style={{  
                  width: '100%',  
                  height: '180px',  
                  objectFit: 'cover', 
                  borderRadius: '4px', 
                  marginBottom: '10px' 
                }} 
              />

              <h3 style={{ margin: '5px 0', textAlign: 'center' }}>{product.name}</h3>

              <div style={{display:'flex', alignItems:'center', margin:'5px 0', height:'20px'}}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    style={{
                      color: star <= (product.rating || 0) ? '#FFD700' : '#ddd',
                      fontSize: '18px',
                      margin: '0 1px'
                    }}
                  >
                    ★
                  </span>
                ))} 
                <span style={{marginLeft:'5px', fontSize:'14px', color:'#666'}}> ({product.rating}/5)</span>
              </div>

              <p style={{color:'#666', fontSize:'0.9rem', textAlign:'center'}}>
                Category: {product.category?.name || "un-categorized"}
              </p>

              <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#333', textAlign: 'center'}}>
                Price: ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
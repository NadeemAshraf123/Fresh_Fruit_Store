import React, { useEffect, useState } from 'react';

const ProductsDisplay = () => {
  const categories = ["All", "fruits", "vegetable", "fastfood", "meat"];
  const [products, setProducts] = useState<Array<any>>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    try {
      const fetchedProducts = localStorage.getItem('products');
      const JSONProducts = fetchedProducts ? JSON.parse(fetchedProducts) : [];
      setProducts(JSONProducts);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }, []);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
  };

  const groupedProducts = categories.reduce((acc, category) => {
    if (category === "All") {
      acc[category] = products;
    } else {
      acc[category] = products.filter((product) =>
        (product.category || "").toString().split(" | ")[1]?.trim().toLowerCase() === category.toLowerCase()
      );
    }
    return acc;
  }, {} as Record<string, any[]>);

  const currentProducts = groupedProducts[activeCategory] || [];

  return (
    <>

    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Product's Display</h1>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleFilter(category)}
            style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeCategory === category ? '#ddd' : '#f0f0f0', cursor: 'pointer', fontWeight: 'bold', textTransform: 'capitalize'}}
          >
            {category}
          </button>
          
        ))}
      </div>
    
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '15px', textTransform: 'capitalize' }}>
          {activeCategory} ({currentProducts.length})
        </h2>
        
        <div style={{  display: 'grid',  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',  gap: '20px', justifyContent: 'center'
        }}>
          {currentProducts.map((product, index) => (
            <div 
              key={index} 
              style={{border: '1px solid #ddd',borderRadius: '8px',padding: '15px',display: 'flex',flexDirection: 'column',alignItems: 'center'
              }}
            >
              <img 
                src={product.images?.[0]} 
                alt={product.name} 
                style={{  width: '100%',  height: '180px',  objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' 
                }} 
              />

              <h3 style={{ margin: '5px 0', textAlign: 'center' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>
                Category: {(product.category || "").toString().split(" | ")[1]?.trim() || "un-categorized"}
              </p>

              <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#333', textAlign: 'center'}}>
                Price: ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <h1>dosplay Products component will displayed</h1>
    </>
  );
};

export default ProductsDisplay;
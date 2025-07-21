import React, { useEffect, useState, useRef } from 'react';

const ProductsDisplay = () => {
  const categories = ["All", "fruits", "vegetables", "fastfood", "meat"];
  const [products, setProducts] = useState<Array<any>>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Array<any>>([]);
  const scrollRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    try {
      const fetchedProducts = localStorage.getItem('products');
      const JSONProducts = fetchedProducts ? JSON.parse(fetchedProducts) : [];
      setProducts(JSONProducts);
      setDisplayedProducts(JSONProducts);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }, []);

  const handleFilter = (category: string) => {
    if (category === "All") {
      setDisplayedProducts(products);
    } else {
      const filteredProducts = products.filter((product) =>
        (product.category || "").toString().split(" | ")[1].trim().toLowerCase() === category.toLowerCase()
      );
      setDisplayedProducts(filteredProducts);
    }
  };

  const scroll = (direction: 'left' | 'right', category: string) => {
    const container = scrollRefs.current[category];
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Group products by category for slider implementation
  const groupedProducts = categories.reduce((acc, category) => {
    if (category === "All") {
      acc[category] = products;
    } else {
      acc[category] = products.filter((product) =>
        (product.category || "").toString().split(" | ")[1].trim().toLowerCase() === category.toLowerCase()
      );
    }
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Product's Display</h1>
      
      {/* Category Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleFilter(category)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: '#f0f0f0',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          >
            {category}
          </button>
        ))}
      </div>
    
      {/* Products by Category with Sliders */}
      {categories.map((category) => {
        const categoryProducts = groupedProducts[category];
        const needsSlider = categoryProducts?.length > 4;
        
        return (
          <div key={category} style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '15px', textTransform: 'capitalize' }}>
              {category} ({categoryProducts?.length || 0})
            </h2>
            
            <div style={{ position: 'relative' }}>
              {needsSlider && (
                <button
                  onClick={() => scroll('left', category)}
                  style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer'
                  }}
                >
                  &lt;
                </button>
              )}
              
              <div
                ref={(el) => (scrollRefs.current[category] = el)}
                style={{
                  display: 'flex',
                  gap: '20px',
                  overflowX: needsSlider ? 'auto' : 'visible',
                  scrollBehavior: 'smooth',
                  padding: '10px 0',
                  scrollbarWidth: 'none', // Hide scrollbar for Firefox
                  msOverflowStyle: 'none', // Hide scrollbar for IE
                }}
              >
                {categoryProducts?.map((product, index) => (
                  <div 
                    key={index} 
                    style={{
                      flex: '0 0 250px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
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
                    <p style={{ 
                      margin: '5px 0',
                      color: '#666',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      Category: {product.category || "Uncategorized"}
                    </p>
                    <p style={{ 
                      margin: '5px 0',
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center'
                    }}>
                      Price: ${product.price}
                    </p>
                  </div>
                ))}
              </div>
              
              {needsSlider && (
                <button
                  onClick={() => scroll('right', category)}
                  style={{
                    position: 'absolute',
                    right: '-40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer'
                  }}
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsDisplay;
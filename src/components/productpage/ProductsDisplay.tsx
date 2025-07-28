import React from 'react'

const ProductsDisplay = () => {
  return (
    <div>ProductsDisplayb  222222222222222</div>
  )
}

export default ProductsDisplay











// import React, { useEffect, useState } from 'react'
// import styles from  './ProductDisplay.module.css';


// interface Product {
//   name: string;
//   image: string;
//   category: {name: string};
// }





// const ProductsDisplay = () => {
//   // const [userscategory, setUsersCategory] = useState<any[]>([]);
//   const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
//   const [product , setProduct] = useState<Product[]>([]);


// useEffect(() => {
//   const localData = localStorage.getItem("products");
//   if (localData) {
//     const parsed: Product[] = JSON.parse(localData);
//     setProduct(parsed); 

//     const categoriesSet = new Set(parsed.map((item: Product) => item.category?.name));
//     setUniqueCategories(Array.from(categoriesSet));
//   }
// }, []);


//   const filteredProducts = (category: string) => {
//     const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
//     if (category === 'All') {
//       setProduct(allProducts);
//     } else {
//       const filtered = allProducts.filter((item: Product) => item.category?.name === category);
//       setProduct(filtered);
//     }
//   };
  
//   return (
//     <div className={styles.productscontainer}>
//       <h2 className={styles.categoryheading}>Shop by Category</h2>
      
//       <div className={styles.categorieslist}>
//         <button 
//           className={styles.categoryutton}
//           onClick={() => console.log("selected category. All")}
//         >
//             All
//         </button>
//         {uniqueCategories.map((category, index) => (
//           <button
//             key={index}
//             className={styles.categorybutton}
//             onClick={() => filteredProducts(category)}
//           >
//             {category.toLowerCase()}
//           </button>
//         ))}
//       </div>


//       <div className={styles.productsgrid}>
//         {product.map((prod, idx) => (
//           <div key={idx} className={styles.productitem}>
//             <img src={prod.image} alt={prod.name} />
//             <h3>{prod.name}</h3>
//             <p>{prod.category?.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsDisplay;
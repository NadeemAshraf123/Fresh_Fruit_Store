import React from "react";
import styles from "./ShowedCategoryToHome.module.css";
import { useNavigate } from "react-router-dom";

const ShowedCategoryToHome = () => {
  const [categoryList, setCategoryList] = React.useState([]);
  const [updateTrigger, setUpdateTrigger] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categoryname") || "[]");
    const activeCategories = stored.filter(category => category.isActive === true);
    setCategoryList(activeCategories);
    console.log("Categories loaded:", activeCategories.length);

    window.updateCategories = () => {
      setUpdateTrigger(prev => prev + 1);
      console.log("Categories update triggered!");
    };

    return () => {
      delete window.updateCategories;
    };
  }, [updateTrigger]); 

  const handleCardClick = (category) => {
    navigate("/shop", { state: { selectedCategory: category } });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Shop by Category</h2>
      
      {categoryList.length > 0 ? (
        <div className={styles.cardsGrid}>
          {categoryList.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => handleCardClick(category)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={styles.categoryImage}
                />
              </div>
              <div className={styles.categoryName}>
                {category.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No categories available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default ShowedCategoryToHome;
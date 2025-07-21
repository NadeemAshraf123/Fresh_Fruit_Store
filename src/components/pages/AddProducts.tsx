import React, { useEffect } from "react";
import styles from "./AddProduct.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Category = { id: string; name: string; isActive: boolean };

 const AddProducts = () => {
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productImages, setProductImages] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [productCategory, setProductCategory] = React.useState<string[]>([]);
  const [isFeatured, setIsFeatured] = React.useState<string>("false");
  const [tableProducts, setTableProducts] = React.useState<any[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any | null>(null);
  const [usersCategories, setUsersCategories] = React.useState<Category[]>([]);

  const [searchName, setSearchName] = React.useState<string>("");
  const [searchCategory, setSearchCategory] = React.useState<string>("");
  const [searchFeatured, setSearchFeatured] = React.useState<string>("");




  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setTableProducts(storedProducts);

    const Categories = JSON.parse(localStorage.getItem("categoryname") || "[]");
    setUsersCategories(Categories);
  }, []);

  // console.log("Users Categories:", usersCategories.map((c) => c.name) );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (productImages.length > 0) {
      const imagePromises = productImages.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader() ;
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((base64Images) => {
        const newProduct = {
          id: uuidv4(),
          name: productName,
          price: productPrice,
          images: base64Images,
          category: productCategory,
          isFeatured: isFeatured === "true"
        }
        const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
        existingProducts.push(newProduct);
        localStorage.setItem("products" ,  JSON.stringify(existingProducts));
        setTableProducts(existingProducts);
        toast.success("Product added successfully with image(s)");
        setProductName("");
        setProductPrice("");
        setProductImages([]);
        setProductCategory([]);
        setIsFeatured("false");
        setErrors({});

      })
    }
  }


  const handleCategoryChange = (e:any) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setProductCategory(selectedValues);
  }
  const handleImageChange = (e: any) => {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files);
          setProductImages(filesArray)
        } 
  }
  const BackToHome = () => {
    navigate("/");
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    const priceValue = Number(productPrice);
    if (!productPrice || isNaN(priceValue) || priceValue <= 0) {
      newErrors.productPrice = "Valid product price is required";
    } else if (!/^\$?\d+(\.\d{1,2})?$/.test(productPrice)) {
      newErrors.productPrice =
        "Product price should be in dollars (e.g., $12.99)";
    }
    if ( productImages.length === 0 ) {
      newErrors.productImage = "Product image is required";
    }
    if (!productCategory || productCategory.length === 0) {
      newErrors.productCategory = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEdit = (product: any) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsEditing(false);
  };

  const saveEditProduct = () => {
    const updatedList = tableProducts.map((p) => 
      p.id === editingProduct.id ? editingProduct : p
    );

    localStorage.setItem("products", JSON.stringify(updatedList));
    setTableProducts(updatedList);
    setIsEditing(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    const filtered = tableProducts.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(filtered));
    setTableProducts(filtered);

    toast.success("deleted successfully:", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const checkFeaturedMatch = (
    itemIsFeatured: boolean,
    inputValue: string
  ): boolean => {
    const normalized = inputValue.trim().toLowerCase();
    if (normalized === "") return true;
    if (normalized === "true") return itemIsFeatured === true;
    if (normalized === "false") return itemIsFeatured === false;
    return false;
  };

  const filteredProducts = tableProducts.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

      // console.log("tableproducts" , tableProducts);
      
    const categoryMatch =
    Array.isArray(item.category)
       ? usersCategories 
            .filter((c) => item.category.includes(c.id))
            .some((c) => c.name.toLowerCase().includes(searchCategory.toLowerCase()))
         : usersCategories

                .find((c) => c.id === item.category)
                ?.name.toLowerCase()
                .includes(searchCategory.toLowerCase());

    const featuredMatch = checkFeaturedMatch(item.isFeatured, searchFeatured); 

    return nameMatch && categoryMatch && featuredMatch;
  });

  const handleRestfunctionality = () => {
        setSearchName("");
        setSearchCategory("");
        setSearchFeatured("");
  }

  return (

    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={styles.input}
            />
          </label>
          {errors.productName && (
            <div className={styles.errorText}>{errors.productName}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Price:
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className={styles.input}
            />
          </label>
          {errors.productPrice && (
            <div className={styles.errorText}>{errors.productPrice}</div>
          )}
        </div>


        <div className={styles.formGroup}>
          <label className={styles.label}>
            Category:
            <select
              multiple
              value={productCategory}
              onChange={handleCategoryChange}
              className={styles.input}
            >

            <option value="" disabled hidden> Select Category </option>
              {usersCategories
                .filter((category: any) => category.isActive === true)
                .map((category: any, index) => (
                  <option key={index} value={`${category.id} | ${category.name}`}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
          {errors.productCategory && (
            <div className={styles.errorText}>{errors.productCategory}</div>
          )}
        </div>



        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Image:
            <input
              type="file"
              accept="image/*"
              multiple
              // onChange={(e) =>  setProductImage(e.target.files ? e.target.files[0] : null)}
                onChange = {handleImageChange}
              className={styles.input}
            />
          </label>
          {errors.productImage && (
            <div className={styles.errorText}>{errors.productImage}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Is Featured:</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="featured"
                value="true"
                checked={isFeatured === "true"}
                onChange={(e) => setIsFeatured(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="featured"
                value="false"
                checked={isFeatured === "false"}
                onChange={(e) => setIsFeatured(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

     <button type="submit" className={styles.button}>
          Add
        </button>
        <button type="button" onClick={BackToHome} className={styles.button}>
          Home
        </button>
      </form>



      <h2 className={styles.AddProductstableheading}> Add Product Table</h2>

      <div className={styles.searchbars}>
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className={styles.ProductPageSearchInputfields}
          type="search"
          placeholder="search by product..."
        />
          <select 
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className={styles.ProductPageSearchInputfields}
          typeof="search"
          >
            <option value="" disabled hidden> Select Category</option>
            {usersCategories.filter((category)=> category.isActive === true)
            .map((category,index) => (
              <option key={index} value={category.name}> {category.name} </option>
            
            ))}
          </select>
        {/* <input
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className={styles.ProductPageSearchInputfields}
          type="search"
          placeholder="search by Category..."
        /> */}
        
        <label htmlFor="featuredSelect">Is Featured:
        <select
          value={searchFeatured}
          onChange={(e) => setSearchFeatured(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        </label>

        <button 
        onClick={handleRestfunctionality}
        className={styles.resetbutton}
        >
          Reset 
        </button>
      </div>



      {/* {tableProducts.length > 0 ? ( */}
      {filteredProducts.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Image</th>
              <th>is Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>

                <td>
                  {Array.isArray(item.category) ? (
                    <ul style={{padding: 0, margin: 0, listStyle:"desimal"}} >
                   {usersCategories 
                            .filter((c) => item.category.includes(c.id))
                              .map((c) => (
                        <li key={c.id} style={{ margin:'16px',textIndent:'-4px', padding: " 4px 0"}}>
                              {c.name}
                              </li>
                            ))}
                        </ul>      
                  ) : ( 
                       usersCategories.find((c) => c.id === item.category)?.name || "Unknown"
                    )}
                </td>

                <td>
                  {Array.isArray(item.images) ? (
                     item.images.map((imgSrc: string, i: number) => (
                    <img 
                    key={i}
                    src={imgSrc} 
                    alt={`${item.name}-${i}`}
                    style={{width: '50px', height: '50px' , borderRadius: '8px' , marginRight: '5px' }} 
                     />
                  ))

                 ) : item.image ? (
                    <img 
                      src={item.image}
                      alt={item.name}
                      style={{width: '50px', height: '50px' , borderRadius: '8PX' ,marginRight: '5px' }}
                      />
                  ) : null}
                 
                </td>


                <td>{item.isFeatured ? "yes" : "No"}</td>

                <td>
                  <button
                    className={styles.Allbuttonsgeneralstyling}
                    style={{ marginRight: "8px" }}
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.Allbuttonsgeneralstyling}
                    onClick={() => deleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 style={{ padding: "1rem", textAlign: "center" }}>
          No Product is Added yet...
        </h2>
      )}

      {/* == here is modal == */}
      {isEditing && editingProduct && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3> Edit Product</h3>

            <label className={styles.label}>
              {" "}
              Product Name:
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className={styles.modalinput}
              />
            </label>

            <label className={styles.label}>
              Product Price:
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                className={styles.modalinput}
              />
            </label>

            <label className={styles.label}>
              {" "}
              Product Category:
              <select
                value={editingProduct.category.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                className={styles.modalinput}
              >
                {usersCategories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.modalformGroup}>
              <label className={styles.label}>Product Image:</label>

              <img
                src={editingProduct.image}
                alt={editingProduct.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  marginBottom: "0.5rem",
                }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditingProduct({
                        ...editingProduct,
                        image: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className={styles.modalinput}
              />
            </div>

            <div className={styles.modalButton}>
              <button
                onClick={saveEditProduct}
                className={styles.modalsavebutton}
                // disabled={!formIsValid}
              >
                {" "}
                Save{" "}
              </button>
              <button onClick={cancelEdit} className={styles.modalcancelbutton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}


export default AddProducts;

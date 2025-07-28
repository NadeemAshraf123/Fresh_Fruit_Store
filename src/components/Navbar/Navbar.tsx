import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import LoginButton from "../Pages/Authentication/LoginButton/LoginButton";

type Product = {
  name: string;
  price: string;
  images?: string[];
};

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValues, setSearchValues] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPagesDrop, setIsPagesDrop] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const pagesDropRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    // console.log("localstorage m kya h ", storedUser);
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  // console.log("storedusers", loggedUser);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        isDropdownOpen
      ) {
        setIsDropdownOpen(false);
      }

      if (
        pagesDropRef.current &&
        !pagesDropRef.current.contains(target) &&
        isPagesDrop
      ) {
        setIsPagesDrop(false);
      }

      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        isModalOpen
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, isPagesDrop, isModalOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSearch = () => {

    const searchedvalues = searchValues.trim();
          if (!searchedvalues) {
            alert("Please enter a product name or price to search");
            return;
          }

    const data = localStorage.getItem("products") || "[]";
    const JSONProducts = JSON.parse(data);


    const foundItem = JSONProducts.find((item: any) =>
      item.name.toLowerCase().includes(searchedvalues.toLowerCase()) ||
       item.price === searchedvalues
    );

    setSelectedProduct(foundItem || null);
    setIsModalOpen(true);
  };

  const HandlePagesDropdown = () => {
    setIsPagesDrop((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleAddProductClick = () => {
    navigate("/add-product");
  };
  const handleProductCategoryPage = () => {
    navigate("/addproductcategory");
  };

  // console.log(
  //   "Saved Products to localStorage by users at Addproduct page:",
  //   JSON.parse(localStorage.getItem("products") || "[]")
  // );

  return (
    <>
      <nav className={styles.mainnavbaar}>
    
        <div className={styles.leftSection}>
          <Link to="/freshstore" className={`${location.pathname === '/freshstore' ? styles.activeLink : ""}`}>
            Fresh Store
          </Link>
        </div>

    

        <div className={styles.centerSection}>
          <ul className={styles.navlinks}>
            <li>
              <Link to="/" className={`${location.pathname === '/' ? styles.activeLink : ""}`}>Home</Link>
            </li>


            
            <li>
              <Link to="/shop" className={`${location.pathname === '/shop' ? styles.activeLink : ""}`}>Shop</Link>
            </li>

            {loggedUser && (
              <li className={styles.pagesdrop}>
                <button
                  className={`${styles.pagesbutton} ${isPagesDrop || 
                    location.pathname === "/add-product" || location.pathname === "/addproductcategory" 
                    ? styles.activeLink
                    : ""
                  }`}
                  onClick={HandlePagesDropdown}
                >
                  Manage
                </button>
                {isPagesDrop && (
                  <ul className={styles.pagesdropmenu} ref={pagesDropRef}>
                    <li>
                      <button
                        onClick={handleAddProductClick}
                        className={styles.pagesdropbutton}
                      >
                        Add Product
                      </button>
                    </li>
                    <li>
                      <button
                        className={styles.pagesdropbutton}
                        onClick={handleProductCategoryPage}
                      >
                        Add Category
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <li>
              <Link to="/aboutus" className={`${location.pathname === '/aboutus' ? styles.activeLink : ""}`}>About</Link>
            </li>
            {/* <li className={styles.dropdown}>
              <button className={styles.dropdownToggle} onClick={toggleDropdown}>
                <span className={styles.Sortingbutton}>Sorting</span>
              </button>

              {isDropdownOpen && (
                <ul className={styles.dropdownMenu} ref={dropdownRef}>
                  <li>
                    <button className={styles.dropdownmenubutton}>
                      Alpha Sort
                    </button>
                  </li>
                  <li>
                    <button className={styles.dropdownmenubutton}>
                      Numeric Sort
                    </button>
                  </li>
                </ul>
              )}
            </li> */}
          </ul>
        </div>
        <div className={styles.rightSection}>

          <LoginButton  loggedUser={loggedUser} />


          {loggedUser && (
            <div className={styles.userInfo}>
              <FontAwesomeIcon icon={faUser} className={styles.UserIcon} />
              <span className={styles.loggedInUserName}>
                {loggedUser.name}
              </span>
            </div>
          )}

          <div className={styles.searchbar}>
            <input
              type="text"
              placeholder="Search by name or price..."
              value={searchValues}
              onChange={(e) => setSearchValues(e.target.value)}
              className={styles.searchbarinput}
              onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchValues.trim()) {
                    handleSearch();
                  }
              }}
            />
            <button 
                onClick={handleSearch}
                // disabled={!searchValues.trim()}
                className={!searchValues.trim() ? styles.disabledButton : ''}
                >

              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {selectedProduct ? (
              <>
                <img
                  src={selectedProduct.images?.[0] || "/default-product.jpg"}
                  alt={selectedProduct.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <h2>{selectedProduct.name}</h2>
                <p>Price: ${selectedProduct.price}</p>
              </>
            ) : (
              <p>No matching product found...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
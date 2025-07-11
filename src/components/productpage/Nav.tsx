import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Lemon from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/Lemon.jpeg";
import LemonTwo from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/LemonTwo.jpeg";
import GreenApples from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/GreenApples.jpeg";
import JuicyMelon from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/JuicyMelon.jpeg";
import MixedBerry from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/MixedBerry.jpeg";
import Pack from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/Pack.jpeg";
import RedApples from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/RedApples.jpeg";
import Strawberry from "/home/enigmatix/Music/reactTypescript/my-app/src/assets/fruits/Strawberry.jpeg";

const productImages: Record<string, string> = {
  lemon: Lemon,
  lemontwo: LemonTwo,
  apple: RedApples,
  greenapples: GreenApples,
  redapples: RedApples,
  strawberry: Strawberry,
  pineapple: Pack,
  juicymelon: JuicyMelon,
  mixedberry: MixedBerry,
  pack: Pack,
};

type Product = {
  name: string;
  price: string;
};

const dummyProducts: Product[] = [
  { name: "Lemon", price: "2.50" },
  { name: "Lemon", price: "2.50" },
  { name: "Apple", price: "3.00" },
  { name: "Strawberry", price: "4.00" },
  { name: "Pineapple", price: "5.00" },
];

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValues, setSearchValues] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPagesDrop, setIsPagesDrop] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const pagesDropRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
    const data = searchValues.trim().toLowerCase();
    console.log(data);
    const foundItem = dummyProducts.find(
      (item) =>
        item.name.toLowerCase().includes(data) || item.price.includes(data)
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
    navigate("/visit-categorypage");
  };

  console.log(
    "Saved Products to localStorage:",
    JSON.parse(localStorage.getItem("products") || "[]")
  );

  return (
    <>
      <nav className={styles.mainnavbaar}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faUser} className={styles.UserIcon} />
          <Link to="/" className={styles.logoText}>
            Fresh Store
          </Link>
        </div>

        <ul className={styles.navlinks}>
          <li>
            {" "}
            <Link to="/"> Home </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to=""> <strong> Shop  </strong></Link>{" "}
          </li>

          <li className={styles.pagesdrop}>
            {" "}
            <button
              className={styles.pagesbutton}
              onClick={HandlePagesDropdown}
            >
              <Link to=""><strong> Pages </strong></Link>
            </button>{" "}
            {isPagesDrop && (
              <ul className={styles.pagesdropmenu} ref={pagesDropRef}>
                <li>
                  {" "}
                  <button
                    onClick={handleAddProductClick}
                    className={styles.pagesdropbutton}
                  >
                    {" "}
                    Add Product{" "}
                  </button>{" "}
                </li>
                <li>
                  {" "}
                  <button className={styles.pagesdropbutton}>
                    {" "}
                    Delete Product{" "}
                  </button>{" "}
                </li>
                <li>
                  {" "}
                  <button className={styles.pagesdropbutton}>
                    {" "}
                    Edit Product{" "}
                  </button>{" "}
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
          <li>
            {" "}
            <Link to="/"> About </Link>{" "}
          </li>

          <li className={styles.dropdown}>
            <button className={styles.dropdownToggle} onClick={toggleDropdown}>
              <span className={styles.Sortingbutton}>Sorting</span>
              <FontAwesomeIcon
                icon={isDropdownOpen ? faChevronDown : faChevronUp}
              />
            </button>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu} ref={dropdownRef}>
                <li>
                  {" "}
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
          </li>

          <li className={styles.searchbar}>
            <input
              type="text"
              placeholder="Sarch by name or price..."
              value={searchValues}
              onChange={(e) => setSearchValues(e.target.value)}
              className={styles.searchbarinput}
            />

            <button onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </li>
        </ul>
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
                  //   src={`/images/${selectedProduct.name.toLowerCase()}.png`}
                  src={
                    productImages[selectedProduct.name.toLowerCase()] || Pack
                  }
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

export default Nav;

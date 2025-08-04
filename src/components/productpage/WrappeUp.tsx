import React from 'react'
// import ProductsDisplay from './ProductsDisplay'
import CardsDisplay from '../CardsDisplay/CardsDisplay'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import AddProducts from '../Pages/AddProduct/AddProducts'
import AddProductCategory from '../Pages/AddProductCategory/AddProductCategory'
import ShowedCategoryToHome from '../Pages/ShowedCategoryToHome/ShowedCategoryToHome'
// import ProductCategory from '../Pages/AddCategory/ProductCategory'

const WrappeUp = ({ onLogout}: { onLogout: () => void }) => {
  return (
    <>
    
    <Navbar onLogout={onLogout} />
    <Home />
    <CardsDisplay />
    {/* <ProductsDisplay /> */}
    <ShowedCategoryToHome />
    {/* <AddProducts /> */}
    {/* <AddProductCategory /> */}


    </>
  )
}

export default WrappeUp
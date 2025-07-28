import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProducts from "./components/Pages/AddProduct/AddProducts";
import ProductPage from "./components/productpage/WrappeUp";
// import ProductCategoryPage from './components/pages/ProductCategoryPage';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FreshStoreFooter from './components/freshstorefooter/FreshStoreFooter';
import LoginPage from './components/Pages/Authentication/LoginPage/LoginPage';
import SignUpPage from './components/Pages/Authentication/SignUpPage/SignUpPage';
import Shop from './components/Pages/Shop/Shop';
import Navbar from './components/Navbar/Navbar';
import AddProductCategory from './components/Pages/AddProductCategory/AddProductCategory';
import AboutUs from './components/about/AboutUs';


export default function App() {
  return (
    <>
    <Router>
      <Routes>
            
        <Route  path='/'           element={ <>  <ProductPage />  <FreshStoreFooter /> </>}    />
        <Route  path='/freshstore' element={ <> <ProductPage />    <FreshStoreFooter />  </> } />
        <Route  path='/shop'       element={ <> <Navbar />  <Shop />  <FreshStoreFooter />   </> } />
        <Route  path='/loginpage'  element={ <LoginPage />  } />
         <Route path='/signuppage' element= { <SignUpPage /> }   />
         <Route path='/aboutus'    element={<>  <AboutUs />   </>}/>

        <Route path='/add-product' element={ <> <Navbar />  <AddProducts />  <FreshStoreFooter /> </>} />
        <Route path='/addproductcategory' element={<>  <Navbar />    <AddProductCategory />  <FreshStoreFooter />  </>} />
      </Routes>

    </Router>
    <ToastContainer />
    </>
  )
}

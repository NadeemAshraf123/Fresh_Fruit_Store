import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProducts from "./components/Pages/AddProduct/AddProducts";
import ProductPage from "./components/productpage/WrappeUp";
import { Fragment } from 'react';
// import ProductCategoryPage from './components/pages/ProductCategoryPage';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FreshStoreFooter from './components/freshstorefooter/FreshStoreFooter';
import LoginPage from './components/Pages/Authentication/LoginPage/LoginPage';
import SignUpPage from './components/Pages/Authentication/SignUpPage/SignUpPage';
import Shop from './components/Pages/Shop/Shop';
import Navbar from './components/Navbar/Navbar';
import AddProductCategory from './components/Pages/AddProductCategory/AddProductCategory';
import AboutUs from './components/aboutpage/AboutPage';
import AboutPage from './components/aboutpage/AboutPage';



export default function App() {
  return (
    <>
    
    <Router>
      <Routes>
            
        <Route  path='/'           element={ <>  <ProductPage />  <FreshStoreFooter /> </>}    />
        <Route  path='/freshstore' element={ <> <ProductPage />    <FreshStoreFooter />  </> } />
        <Route  path='/shop'       element={ <> <Navbar />  <Shop />  <FreshStoreFooter />   </> } />
        <Route  path='/login'  element={ <LoginPage />  } />
         <Route path='/signuppage' element= { <SignUpPage /> }   />
         <Route path='/aboutpage'    element={<> <Navbar />  <AboutPage />   <FreshStoreFooter /> </>}/>

        <Route path='/add-product' element={ 
             <Fragment> 
              <Navbar /> 
               <AddProducts /> 
                <FreshStoreFooter /> 
                  </Fragment>  
                 } 
              />
        <Route path='/addproductcategory' element={   
          <Fragment> 
           <Navbar />    
            <AddProductCategory /> 
               <FreshStoreFooter /> 
                  </Fragment>   
        } 
        />

      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

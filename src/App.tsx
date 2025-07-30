import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProducts from "./components/Pages/AddProduct/AddProducts";
// import ProductPage from "./components/productpage/WrappeUp";
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
import ProtectedRoute from './components/protectroutes/ProtectedRoutes';
import WrappeUp from './components/productpage/WrappeUp';





export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

useEffect(() => {
  const syncAuth = () => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  };
  window.addEventListener('storage', syncAuth);
  return () => window.removeEventListener('storage', syncAuth);
}, []);



  return (
    <>
    
    <Router>
      <Routes>
            
        <Route  path='/'           element={ <>  <WrappeUp onLogout={() => setIsAuthenticated(false)} />  <FreshStoreFooter /> </>}    />
        <Route  path='/freshstore' element={ <> <WrappeUp onLogout={() => setIsAuthenticated(false)} />   <FreshStoreFooter />  </> } />
        <Route  path='/shop'       element={ <> <Navbar onLogout={() => setIsAuthenticated(false)} />  <Shop />  <FreshStoreFooter />   </> } />
        <Route  path='/login'  element={ <LoginPage setIsAuthenticated={setIsAuthenticated} />}/>
         <Route path='/signuppage' element= { <SignUpPage /> }   />
         <Route path='/aboutpage'    element={<> <Navbar onLogout={() => setIsAuthenticated(false)} />  <AboutPage />   <FreshStoreFooter /> </>}/>
        
        <Route element={ <ProtectedRoute isAllowed={isAuthenticated} /> }> 
        <Route path='/add-product' element={ 
             <Fragment> 
              <Navbar onLogout={() => setIsAuthenticated(false)} /> 
               <AddProducts /> 
                <FreshStoreFooter /> 
                  </Fragment>  
                 } 
              />
        <Route path='/addproductcategory' element={   
          <Fragment> 
           <Navbar onLogout={() => setIsAuthenticated(false)} />    
            <AddProductCategory /> 
               <FreshStoreFooter /> 
                  </Fragment>   
        } 
        />
    </Route>

      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

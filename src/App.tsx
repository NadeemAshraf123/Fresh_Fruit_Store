import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProducts from "./components/Pages/AddProduct/AddProducts";
import { Fragment } from 'react';
import { ToastContainer } from "react-toastify";
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

// Dashboard Section imports 
import DashboardShell from './components/productDashboard/layout/DashboardShell';
import ProductDashboard from './components/productDashboard/productdashboard/ProductDasgboard';
import AuthenticatedUsers from './components/productDashboard/adminSection/AuthenticatedUsers';
import AddDashboardProduct from './components/productDashboard/pages/addDashboardProduct/AddDashboardProduct';
import AddDashboardCategory from './components/productDashboard/pages/addDashboardCategory/AddDashboardCategory';





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
      {/* Public Routes  */}
      <Router>
        <Routes>
          <Route path='/' element={<>  <WrappeUp onLogout={() => setIsAuthenticated(false)} />  <FreshStoreFooter /> </>} />
          <Route path='/freshstore' element={<> <WrappeUp onLogout={() => setIsAuthenticated(false)} />   <FreshStoreFooter />  </>} />
          <Route path='/shop' element={<> <Navbar onLogout={() => setIsAuthenticated(false)} />  <Shop />  <FreshStoreFooter />   </>} />
          <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/signuppage' element={<SignUpPage />} />
          <Route path='/aboutpage' element={<> <Navbar onLogout={() => setIsAuthenticated(false)} />  <AboutPage />   <FreshStoreFooter /> </>} />
          <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
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
              </Fragment>} />  
            </Route>

          {/* Dashboard Routes - Protected  */}

          <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
            <Route path="/dashboard" element={<DashboardShell />}>
              <Route index element={<ProductDashboard />} />
              <Route path='authenticatedUsers' element={ <AuthenticatedUsers /> }  /> 
              <Route path="adddashboardproduct" element={<AddDashboardProduct />   } />
              <Route path="adddashboardcategory" element={<AddDashboardCategory /> } />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

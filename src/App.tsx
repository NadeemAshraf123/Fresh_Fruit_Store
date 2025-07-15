import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProducts from "./components/pages/AddProducts";
import ProductPage from "./components/productpage/ProductPage";
import Nav from './components/productpage/Nav';
import ProductCategoryPage from './components/pages/ProductCategoryPage';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FreshStoreFooter from './components/freshstorefooter/FreshStoreFooter';


export default function App() {
  return (
    <>
    <Router>
      <Routes>
            
        <Route path='/' element={ <>  <ProductPage />  <FreshStoreFooter /> </>}    />
        <Route path='/add-product' element={ <> <Nav /> <AddProducts />  </>} />
        <Route path='/visit-categorypage' element={<> <Nav /> <ProductCategoryPage /> </>} />
      </Routes>

    </Router>
    <ToastContainer />
    </>
  )
}

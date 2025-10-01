import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/AddProduct';
import ManageProduct from './pages/admin/ManageProduct';
import ManageOrder from './pages/admin/ManageOrder';
import Notfound from './pages/Notfound';
import { Toaster } from "react-hot-toast";
import Login from './pages/admin/Login';
import { useSelector } from 'react-redux';
import ProtectRoute from './utils/ProtectRoute';



const App = () => {
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.admin);
  return (
    <>
    <Toaster />
    {!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/login') && <Navbar />}
    <Routes>
      {/* client Route */}
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/product' element={<Product />} />

      {/* admin route */}
      {/* { isAuth  } */}
      <Route path="/login" element={ isAuth ? <Navigate to='/admin' replace />  :<Login />} /> 
      
       <Route path='/admin' element={
           <ProtectRoute>
             <AdminLayout />
           </ProtectRoute>
          }>
       <Route index element={<Dashboard />} />
       <Route path='add-product' element={<AddProduct />} />
       <Route path='manage-product' element={<ManageProduct />} />
       <Route path='manage-order' element={<ManageOrder />} />
       </Route>     
      <Route path='*' element={<Notfound />} />
    </Routes>
    </>
  )
}

export default App
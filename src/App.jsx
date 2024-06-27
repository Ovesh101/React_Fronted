
import {   Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Adjust the path as necessary
import Register from './components/Register'; // Adjust the path as necessary
import ProductLayout from './pages/ProductLayout';
import ProductDetail from './pages/ProductDetail';
import ViewCart from './pages/ViewCart';
import PaymentForm from './pages/PaymentForm';

import OrderModel from './pages/OrderModel';
import Errorpage from './pages/ErrorPage';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';


function App() {
  return (
    <Routes>

        <Route path="/" element={<Login />} /> {/* Default home page as login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<ProductLayout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/view-cart" element={<ViewCart />} />
        <Route path="/product/payment-form/:id" element={<PaymentForm />} />
        <Route path="/product/payment-form/order" element={<OrderModel />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
        <Route path = "*" element={<Errorpage/>}/>
       
      
    </Routes>
  );
}

export default App;

// Definir rutas de las paginas principales de la aplicacion web 

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/NavBar';
import Footer from './components/Footer'
import CustomerManagment from './pages/CustomerManagment';
import CategoriesManagment from './pages/CategoriesManagment';
import ProductManagment from './pages/ProductManagment';
import ModalVariantProduct from './components/ModalVariantProduct';
import UserManagment from './pages/UserManagment';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import DisccountPage from './pages/DisccountPage';
import PaymentMethods from './components/PaymentMethods';
import StripePayment from './components/payments/StripePayment';
import OrderPage from './pages/OrderPage';
import './Global.css'

function App() {
  const [rolId, setRolId] = useState(null);

  useEffect(() => {
    // Comprobar si hay un token en el almacenamiento local
    const storedRolId = localStorage.getItem('rolId'); // 1: Admin, 2: Empleado, 3: Cliente
    if (storedRolId) {
      setRolId(storedRolId);  
    } else {
      console.log('RolId no encontrado');
    }
  }
  , []);

  return (
    <Router>
      <Navbar /> {/* Barra de navegación que estará visible en todas las rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-managment" element={<CustomerManagment rolId={rolId}/>} />
{/*         <Route path="/modal" element={<Modal />} /> */}
        <Route path="/product-managment" element={<ProductManagment  rolId={rolId}/>}/>
        <Route path="/modal-variant-product" element={<ModalVariantProduct />} />
        <Route path="/user-managment" element={<UserManagment rolId={rolId}/>} />
        <Route path="/categories-managment" element={<CategoriesManagment rolId={rolId}/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:gender" element={<CategoryPage />} />
        <Route path="/category/:gender/:category" element={<CategoryPage />} />
        <Route path="/category/:gender/subcat/:subcategory" element={<CategoryPage />} />
        <Route path="/discounts" element={<DisccountPage />} />

        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/stripe-payment" element={<StripePayment />} />
        <Route path="/order-confirmation/:id_usuario/:id_pedido" element={<OrderPage />}  />
      </Routes>
      <Footer /> {/* Pie de página que estará visible en todas las rutas */}
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/organisms/Cart/CartDrawer';
import './App.css';

// Pages
import HomePage from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import ProductsPage from './pages/cliente/ProductsPage';
import CategoriesPage from './pages/cliente/CategoriesPage';
import BanchPage from './pages/cliente/BanchPage';
import CheckoutPage from './pages/cliente/CheckoutPage';
import SuccessPage from './pages/cliente/SuccessPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/sucursales" element={<BanchPage />} />

            {/* Rutas Protegidas */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={['cliente', 'admin', 'vendedor', 'farmaceutico']}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <SuccessPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <CartDrawer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

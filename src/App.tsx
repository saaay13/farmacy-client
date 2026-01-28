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

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import InventoryPage from './pages/admin/InventoryPage';
import PointOfSalePage from './pages/admin/PointOfSalePage';
import AlertsPage from './pages/admin/AlertsPage';
import UsersPage from './pages/admin/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute clientOnly requireAuth={false}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/productos"
              element={
                <ProtectedRoute clientOnly requireAuth={false}>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categorias"
              element={
                <ProtectedRoute clientOnly requireAuth={false}>
                  <CategoriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sucursales"
              element={
                <ProtectedRoute clientOnly requireAuth={false}>
                  <BanchPage />
                </ProtectedRoute>
              }
            />

            {/* Rutas Protegidas de Pago (Solo Cliente) */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={['cliente']} clientOnly>
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

            {/* RUTAS ADMINISTRATIVAS */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin', 'farmaceutico', 'vendedor']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inventario"
              element={
                <ProtectedRoute allowedRoles={['admin', 'farmaceutico']}>
                  <InventoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pos"
              element={
                <ProtectedRoute allowedRoles={['admin', 'farmaceutico', 'vendedor']}>
                  <PointOfSalePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/alertas"
              element={
                <ProtectedRoute allowedRoles={['admin', 'farmaceutico', 'vendedor']}>
                  <AlertsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UsersPage />
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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import ProductsPage from './pages/cliente/ProductsPage';
import CategoriesPage from './pages/cliente/CategoriesPage';
import BanchPage from './pages/cliente/BanchPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/sucursales" element={<BanchPage />} />
      </Routes>
    </Router>
  );
}

export default App;

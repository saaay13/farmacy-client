import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import ProductsPage from './pages/Products/ProductsPage';
import './App.css';
import CategoriesPage from './pages/Categories/CategoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Home/Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Ruta de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta de Productos */}
        <Route path="/productos" element={<ProductsPage />} />

        {/* Ruta de Categorías (Redirige al catálogo filtrado) */}
        <Route path="/categorias" element={<CategoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

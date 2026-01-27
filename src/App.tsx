import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Home/Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Ruta de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta de Productos - Por implementar */}
        <Route path="/productos" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Catálogo de Productos</h1>
              <p className="text-muted-foreground">Próximamente...</p>
            </div>
          </div>
        } />

        {/* Ruta de Categorías - Por implementar */}
        <Route path="/categorias" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Categorías</h1>
              <p className="text-muted-foreground">Próximamente...</p>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;

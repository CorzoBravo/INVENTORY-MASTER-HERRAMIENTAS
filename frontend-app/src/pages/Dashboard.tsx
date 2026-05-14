import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Control</h1>
        <div className="user-info">
          <span>Bienvenido, {user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main className="dashboard-content">
        <div className="dashboard-cards">
          <div className="card" onClick={() => navigate('/catalogo')}>
            <h3>Nueva Venta</h3>
            <p>Catálogo de productos</p>
          </div>
          <div className="card" onClick={() => navigate('/ventas')}>
            <h3>Ventas</h3>
            <p>Historial de ventas</p>
          </div>
          <div className="card" onClick={() => navigate('/productos')}>
            <h3>Productos</h3>
            <p>Gestiona el inventario</p>
          </div>
          <div className="card" onClick={() => navigate('/categorias')}>
            <h3>Categorías</h3>
            <p>Administra categorías</p>
          </div>
          <div className="card" onClick={() => navigate('/clientes')}>
            <h3>Clientes</h3>
            <p>Gestiona tus clientes</p>
          </div>
          {totalItems > 0 && (
            <div className="card card-highlight" onClick={() => navigate('/carrito')}>
              <h3>Carrito</h3>
              <p>{totalItems} producto(s) en el carrito</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
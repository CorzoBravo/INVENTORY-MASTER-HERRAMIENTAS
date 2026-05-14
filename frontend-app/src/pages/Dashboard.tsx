import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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
          <div className="card">
            <h3>Productos</h3>
            <p>Gestiona el inventario de productos</p>
          </div>
          <div className="card">
            <h3>Categorías</h3>
            <p>Administra categorías de productos</p>
          </div>
          <div className="card">
            <h3>Clientes</h3>
            <p>Gestiona tus clientes</p>
          </div>
          <div className="card">
            <h3>Ventas</h3>
            <p>Registro y seguimiento de ventas</p>
          </div>
        </div>
      </main>
    </div>
  );
}
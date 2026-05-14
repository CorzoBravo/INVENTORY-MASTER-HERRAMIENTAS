import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Inventario Maestro Herramientas</h1>
        <p>Gestión de inventario y ventas simplificada</p>
        <div className="home-actions">
          <a href="/login" className="btn-home btn-primary">Iniciar Sesión</a>
          <a href="/register" className="btn-home btn-secondary">Registrarse</a>
        </div>
      </div>
    </div>
  );
}
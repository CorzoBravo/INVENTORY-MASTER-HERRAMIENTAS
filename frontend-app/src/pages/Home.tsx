import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../components/Button';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Inventario Maestro
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestión de inventario y ventas simplificada para tu negocio
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/login')}>
            Iniciar Sesión
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/register')}>
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  );
}
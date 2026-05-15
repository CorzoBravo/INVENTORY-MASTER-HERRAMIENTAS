import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../components/Button';
import { BarChart3, ShoppingCart, Users, TrendingUp, Check } from 'lucide-react';
import Card from '../components/Card';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: ShoppingCart,
      title: 'Gestión de Ventas',
      description: 'Registra y gestiona todas tus ventas en un solo lugar'
    },
    {
      icon: BarChart3,
      title: 'Reportes Detallados',
      description: 'Análisis completos de tu inventario y ventas'
    },
    {
      icon: Users,
      title: 'Gestión de Clientes',
      description: 'Mantén un registro organizado de todos tus clientes'
    },
    {
      icon: TrendingUp,
      title: 'Seguimiento de Inventario',
      description: 'Control en tiempo real de tu stock disponible'
    },
  ];

  const benefits = [
    'Interfaz intuitiva y fácil de usar',
    'Acceso desde cualquier dispositivo',
    'Seguridad de datos garantizada',
    'Soporte técnico disponible 24/7',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Inventario Maestro</h1>
              <p className="text-xs text-muted-foreground">Gestión completa de inventario</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                Nuevo
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
              Gestiona tu inventario como un <span className="text-primary">profesional</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Simplifica la gestión de tu inventario y ventas con una plataforma moderna, segura e intuitiva diseñada para tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" onClick={() => navigate('/register')} className="gap-2">
                Comenzar Gratis
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Tengo una cuenta
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              No requiere tarjeta de crédito • Acceso inmediato • Cancela cuando quieras
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
            <Card className="relative p-8 shadow-xl">
              <div className="space-y-4">
                <div className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full w-2/3"></div>
                <div className="h-2 bg-muted rounded-full"></div>
                <div className="h-2 bg-muted rounded-full w-5/6"></div>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="h-16 bg-muted rounded-lg"></div>
                  <div className="h-16 bg-muted rounded-lg"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 sm:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Funcionalidades principales</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar tu negocio de manera eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">¿Por qué elegir Inventario Maestro?</h2>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-lg text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900">
                <span className="font-semibold">Hecho simple:</span> Regístrate en segundos y comienza a gestionar tu inventario inmediatamente.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-3xl"></div>
            <Card className="relative p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                  <div className="h-2 bg-muted rounded w-1/2 mt-1"></div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                  <div className="h-2 bg-muted rounded w-1/2 mt-1"></div>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full h-10 bg-primary text-white rounded-lg font-semibold"></button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Comienza hoy mismo</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están gestionando su inventario de manera más eficiente.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            onClick={() => navigate('/register')}
          >
            Crear cuenta gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-foreground/50 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Inventario Maestro. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
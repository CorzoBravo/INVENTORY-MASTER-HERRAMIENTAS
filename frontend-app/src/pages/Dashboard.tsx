import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Package, Users, Tags, ShoppingBag, TrendingUp, LogOut, Home } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

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

  const menuItems = [
    { title: 'Nueva Venta', description: 'Catálogo de productos', icon: ShoppingBag, path: '/catalogo', color: 'from-blue-500 to-blue-600' },
    { title: 'Ventas', description: 'Historial de ventas', icon: TrendingUp, path: '/ventas', color: 'from-green-500 to-green-600' },
    { title: 'Productos', description: 'Gestiona el inventario', icon: Package, path: '/productos', color: 'from-purple-500 to-purple-600' },
    { title: 'Categorías', description: 'Administra categorías', icon: Tags, path: '/categorias', color: 'from-orange-500 to-orange-600' },
    { title: 'Clientes', description: 'Gestiona tus clientes', icon: Users, path: '/clientes', color: 'from-cyan-500 to-cyan-600' },
    ...(totalItems > 0 ? [{ title: 'Carrito', description: `${totalItems} producto(s)`, icon: ShoppingCart, path: '/carrito', color: 'from-indigo-500 to-indigo-600', highlight: true }] : []),
  ];

  const stats = [
    { label: 'Productos', value: '0', change: '+0%', icon: Package },
    { label: 'Clientes', value: '0', change: '+0%', icon: Users },
    { label: 'Ventas', value: '$0', change: '+0%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel de Control</h1>
              <p className="text-xs text-muted-foreground">Inventario Maestro</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">Bienvenido, {user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Home className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Dashboard</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-xs text-secondary font-semibold mt-2">{stat.change} este mes</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Accesos rápidos</h2>
          <p className="text-muted-foreground">Atajos a las funciones principales del sistema</p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="group relative overflow-hidden"
              >
                <Card
                  className="p-6 text-left h-full hover:shadow-xl transition-all cursor-pointer"
                  clickable={true}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {item.highlight && (
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-bl-full"></div>
                  )}

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                      {item.highlight && <Badge variant="default">Nuevo</Badge>}
                    </div>

                    <p className="text-sm text-muted-foreground">{item.description}</p>

                    {item.highlight && (
                      <div className="mt-4 inline-block px-3 py-1 bg-indigo-50 rounded-full">
                        <p className="text-xs font-semibold text-indigo-700">{item.description}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">💡 Consejo:</span> Utiliza los accesos rápidos para navegar por el sistema. Todos los cambios se guardan automáticamente.
          </p>
        </div>
      </main>
    </div>
  );
}
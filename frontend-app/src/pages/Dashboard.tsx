import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Package, Users, Tags, ShoppingBag, TrendingUp } from 'lucide-react';

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
    { title: 'Nueva Venta', description: 'Catálogo de productos', icon: ShoppingBag, path: '/catalogo', color: 'bg-blue-500' },
    { title: 'Ventas', description: 'Historial de ventas', icon: TrendingUp, path: '/ventas', color: 'bg-green-500' },
    { title: 'Productos', description: 'Gestiona el inventario', icon: Package, path: '/productos', color: 'bg-purple-500' },
    { title: 'Categorías', description: 'Administra categorías', icon: Tags, path: '/categorias', color: 'bg-orange-500' },
    { title: 'Clientes', description: 'Gestiona tus clientes', icon: Users, path: '/clientes', color: 'bg-cyan-500' },
    ...(totalItems > 0 ? [{ title: 'Carrito', description: `${totalItems} producto(s)`, icon: ShoppingCart, path: '/carrito', color: 'bg-indigo-500', highlight: true }] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Panel de Control</h1>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Bienvenido, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`p-6 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-lg ${
                  item.highlight 
                    ? 'bg-indigo-50 border-2 border-indigo-500' 
                    : 'bg-white border border-slate-200'
                }`}
              >
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
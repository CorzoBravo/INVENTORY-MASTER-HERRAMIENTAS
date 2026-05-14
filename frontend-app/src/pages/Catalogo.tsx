import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productoService, categoriaService, type Producto, type Categoria } from '../services/api';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

export default function Catalogo() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [productosData, categoriasData] = await Promise.all([
          productoService.list(),
          categoriaService.list(),
        ]);
        if (!cancelled) {
          setProductos(productosData);
          setCategorias(categoriasData);
        }
      } catch {
        if (!cancelled) setError('Error al cargar productos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const productosFiltrados = productos.filter((p) => {
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(search.toLowerCase());
    const matchesCategoria = !categoriaId || p.categoriaId === parseInt(categoriaId);
    return matchesSearch && matchesCategoria && p.stock > 0;
  });

  const handleAddToCart = (producto: Producto) => {
    addItem(producto, 1);
  };

  if (loading) return <div className="catalogo-loading">Cargando...</div>;

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <h1>Catálogo de Productos</h1>
        <Button onClick={() => navigate('/dashboard')}>Volver</Button>
      </div>

      {error && <div className="catalogo-error">{error}</div>}

      <div className="catalogo-filters">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="catalogo-search"
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="catalogo-select"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      <div className="catalogo-grid">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="producto-card">
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p className="producto-desc">{producto.descripcion || 'Sin descripción'}</p>
              <p className="producto-categoria">
                {producto.categoria?.nombre || 'Sin categoría'}
              </p>
              <div className="producto-details">
                <span className="producto-precio">${producto.precio.toFixed(2)}</span>
                <span className="producto-stock">Stock: {producto.stock}</span>
              </div>
            </div>
            <Button onClick={() => handleAddToCart(producto)} disabled={producto.stock === 0}>
              {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </Button>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="catalogo-empty">No se encontraron productos</div>
      )}

      <button className="cart-float" onClick={() => setShowCart(!showCart)}>
        🛒 Carrito
      </button>
    </div>
  );
}
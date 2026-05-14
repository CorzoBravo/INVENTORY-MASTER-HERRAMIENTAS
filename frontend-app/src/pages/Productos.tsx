import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { productoService, categoriaService, type Producto, type Categoria } from '../services/api';

export default function Productos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
  });

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
        if (!cancelled) setError('Error al cargar datos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock) || 0,
        categoriaId: formData.categoriaId ? parseInt(formData.categoriaId) : undefined,
      };

      if (editingProducto) {
        await productoService.update(editingProducto.id, data);
      } else {
        await productoService.create(data);
      }
      setModalOpen(false);
      setEditingProducto(null);
      setFormData({ nombre: '', descripcion: '', precio: '', stock: '', categoriaId: '' });
      const [productosData] = await Promise.all([productoService.list(), categoriaService.list()]);
      setProductos(productosData);
    } catch {
      setError(editingProducto ? 'Error al actualizar' : 'Error al crear');
    }
  };

  const handleEdit = (producto: Producto) => {
    setEditingProducto(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio.toString(),
      stock: producto.stock.toString(),
      categoriaId: producto.categoriaId?.toString() || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (producto: Producto) => {
    if (confirm(`¿Eliminar producto "${producto.nombre}"?`)) {
      try {
        await productoService.remove(producto.id);
        const [productosData] = await Promise.all([productoService.list(), categoriaService.list()]);
        setProductos(productosData);
      } catch {
        setError('Error al eliminar');
      }
    }
  };

  const openNewModal = () => {
    setEditingProducto(null);
    setFormData({ nombre: '', descripcion: '', precio: '', stock: '', categoriaId: '' });
    setModalOpen(true);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Productos</h1>
        <Button onClick={() => navigate('/dashboard')}>Volver</Button>
      </div>

      {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}

      <Button onClick={openNewModal} style={{ marginBottom: '1rem' }}>Nuevo Producto</Button>

      <Table
        data={productos}
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'nombre', header: 'Nombre' },
          { key: 'descripcion', header: 'Descripción' },
          { key: 'precio', header: 'Precio', render: (p) => `$${p.precio}` },
          { key: 'stock', header: 'Stock' },
          { key: 'categoria', header: 'Categoría', render: (p) => p.categoria?.nombre || '-' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProducto ? 'Editar Producto' : 'Nuevo Producto'}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <Input
            label="Descripción"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
          <Input
            label="Precio"
            type="number"
            step="0.01"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
            required
          />
          <Input
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Categoría</label>
            <select
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '1rem' }}
              value={formData.categoriaId}
              onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Button type="submit">{editingProducto ? 'Actualizar' : 'Crear'}</Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
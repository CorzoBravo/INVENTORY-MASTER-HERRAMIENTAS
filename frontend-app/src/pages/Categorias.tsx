import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { categoriaService, type Categoria } from '../services/api';

export default function Categorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await categoriaService.list();
        if (!cancelled) setCategorias(data);
      } catch {
        if (!cancelled) setError('Error al cargar categorías');
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
      if (editingCategoria) {
        await categoriaService.update(editingCategoria.id, formData);
      } else {
        await categoriaService.create(formData);
      }
      setModalOpen(false);
      setEditingCategoria(null);
      setFormData({ nombre: '', descripcion: '' });
      const data = await categoriaService.list();
      setCategorias(data);
    } catch {
      setError(editingCategoria ? 'Error al actualizar' : 'Error al crear');
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setFormData({ nombre: categoria.nombre, descripcion: categoria.descripcion || '' });
    setModalOpen(true);
  };

  const handleDelete = async (categoria: Categoria) => {
    if (confirm(`¿Eliminar categoría "${categoria.nombre}"?`)) {
      try {
        await categoriaService.remove(categoria.id);
        const data = await categoriaService.list();
        setCategorias(data);
      } catch {
        setError('Error al eliminar');
      }
    }
  };

  const openNewModal = () => {
    setEditingCategoria(null);
    setFormData({ nombre: '', descripcion: '' });
    setModalOpen(true);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Categorías</h1>
        <Button onClick={() => navigate('/dashboard')}>Volver</Button>
      </div>

      {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}

      <Button onClick={openNewModal} style={{ marginBottom: '1rem' }}>Nueva Categoría</Button>

      <Table
        data={categorias}
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'nombre', header: 'Nombre' },
          { key: 'descripcion', header: 'Descripción' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}>
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
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Button type="submit">{editingCategoria ? 'Actualizar' : 'Crear'}</Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
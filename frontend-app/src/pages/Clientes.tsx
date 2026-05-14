import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { clienteService, type Cliente } from '../services/api';

export default function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await clienteService.list();
        if (!cancelled) setClientes(data);
      } catch {
        if (!cancelled) setError('Error al cargar clientes');
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
      if (editingCliente) {
        await clienteService.update(editingCliente.id, formData);
      } else {
        await clienteService.create(formData);
      }
      setModalOpen(false);
      setEditingCliente(null);
      setFormData({ identificacion: '', nombres: '', apellidos: '', email: '', telefono: '', direccion: '' });
      const data = await clienteService.list();
      setClientes(data);
    } catch {
      setError(editingCliente ? 'Error al actualizar' : 'Error al crear');
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      identificacion: cliente.identificacion,
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
    setModalOpen(true);
  };

  const handleDelete = async (cliente: Cliente) => {
    if (confirm(`¿Eliminar cliente "${cliente.nombres} ${cliente.apellidos}"?`)) {
      try {
        await clienteService.remove(cliente.id);
        const data = await clienteService.list();
        setClientes(data);
      } catch {
        setError('Error al eliminar');
      }
    }
  };

  const openNewModal = () => {
    setEditingCliente(null);
    setFormData({ identificacion: '', nombres: '', apellidos: '', email: '', telefono: '', direccion: '' });
    setModalOpen(true);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Clientes</h1>
        <Button onClick={() => navigate('/dashboard')}>Volver</Button>
      </div>

      {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}

      <Button onClick={openNewModal} style={{ marginBottom: '1rem' }}>Nuevo Cliente</Button>

      <Table
        data={clientes}
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'identificacion', header: 'Identificación' },
          { key: 'nombres', header: 'Nombres' },
          { key: 'apellidos', header: 'Apellidos' },
          { key: 'email', header: 'Email' },
          { key: 'telefono', header: 'Teléfono' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Identificación"
            value={formData.identificacion}
            onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
            required
          />
          <Input
            label="Nombres"
            value={formData.nombres}
            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
            required
          />
          <Input
            label="Apellidos"
            value={formData.apellidos}
            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Teléfono"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            required
          />
          <Input
            label="Dirección"
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
            required
          />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Button type="submit">{editingCliente ? 'Actualizar' : 'Crear'}</Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ventaService, type Venta } from '../services/api';
import Button from '../components/Button';

export default function Ventas() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const ventasData = await ventaService.list();
        if (!cancelled) {
          setVentas(ventasData);
        }
      } catch {
        if (!cancelled) setError('Error al cargar ventas');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = async (venta: Venta) => {
    if (confirm(`¿Anular la venta #${venta.id}? Esto restaurará el stock.`)) {
      try {
        await ventaService.remove(venta.id);
        const ventasData = await ventaService.list();
        setVentas(ventasData);
      } catch {
        setError('Error al anular la venta');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="ventas-container">
      <div className="ventas-header">
        <h1>Historial de Ventas</h1>
        <div className="ventas-actions">
          <Button onClick={() => navigate('/catalogo')}>Nueva Venta</Button>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>Volver</Button>
        </div>
      </div>

      {error && <div className="ventas-error">{error}</div>}

      <div className="ventas-table-container">
        <table className="ventas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>#{venta.id}</td>
                <td>{formatDate(venta.createdAt)}</td>
                <td>
                  {venta.cliente ? (
                    <div className="venta-cliente">
                      <span className="cliente-nombre">
                        {venta.cliente.nombres} {venta.cliente.apellidos}
                      </span>
                      <span className="cliente-id">{venta.cliente.identificacion}</span>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="venta-total">${venta.total.toFixed(2)}</td>
                <td>
                  <div className="venta-actions">
                    <Button variant="secondary" onClick={() => navigate(`/ventas/${venta.id}`)}>
                      Ver Detalle
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(venta)}>
                      Anular
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ventas.length === 0 && (
        <div className="ventas-empty">
          <p>No hay ventas registradas</p>
          <Button onClick={() => navigate('/catalogo')}>Realizar Primera Venta</Button>
        </div>
      )}
    </div>
  );
}
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

export default function Carrito() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, total, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="carrito-container">
        <div className="carrito-header">
          <h1>Carrito de Compras</h1>
          <Button onClick={() => navigate('/dashboard')}>Volver</Button>
        </div>
        <div className="carrito-empty">
          <p>El carrito está vacío</p>
          <Button onClick={() => navigate('/catalogo')}>Ver Productos</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1>Carrito de Compras</h1>
        <Button onClick={() => navigate('/catalogo')}>Seguir Comprando</Button>
      </div>

      <div className="carrito-content">
        <div className="carrito-items">
          <table className="carrito-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.producto.id}>
                  <td>
                    <div className="carrito-producto">
                      <span className="carrito-nombre">{item.producto.nombre}</span>
                      <span className="carrito-categoria">
                        {item.producto.categoria?.nombre || 'Sin categoría'}
                      </span>
                    </div>
                  </td>
                  <td>${item.producto.precio.toFixed(2)}</td>
                  <td>
                    <div className="carrito-cantidad">
                      <button onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}>-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}>+</button>
                    </div>
                  </td>
                  <td>${(item.producto.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <button className="carrito-remove" onClick={() => removeItem(item.producto.id)}>
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="carrito-summary">
          <div className="carrito-summary-item">
            <span>Total de artículos:</span>
            <span>{totalItems}</span>
          </div>
          <div className="carrito-summary-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="carrito-actions">
            <Button onClick={() => navigate('/checkout')}>Proceder al Checkout</Button>
            <Button variant="secondary" onClick={clearCart}>Vaciar Carrito</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
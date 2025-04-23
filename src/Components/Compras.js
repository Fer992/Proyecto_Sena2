import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import CategoryList from '../Components/CategoryList';
import styles from '../styles/Compras.module.css';

// Lista de productos disponibles
const productos = [
  { id: 1, nombre: 'Tomate', precio: '1200', img: 'https://via.placeholder.com/150' },
  { id: 2, nombre: 'Lechuga', precio: '2500', img: 'https://via.placeholder.com/150' },
  { id: 3, nombre: 'Zanahoria', precio: '750', img: 'https://via.placeholder.com/150' },
  { id: 4, nombre: 'Pepino', precio: '1500', img: 'https://via.placeholder.com/150' },
  { id: 5, nombre: 'Pimiento', precio: '1200', img: 'https://via.placeholder.com/150' },
  { id: 6, nombre: 'Cebolla', precio: '1500', img: 'https://via.placeholder.com/150' },
  { id: 7, nombre: 'Ajo', precio: '2000', img: 'https://via.placeholder.com/150' },
  { id: 8, nombre: 'Berenjena', precio: '2500', img: 'https://via.placeholder.com/150' },
  { id: 9, nombre: 'Espinaca', precio: '1800', img: 'https://via.placeholder.com/150' },
];

// ID de cliente de PayPal (sandbox o producción)
const CLIENT_ID = 'Ae5M3H5z5TMB1letFpwdxWUw8hTnWZyORC7JzwkkVmMbmU1IpEzSsK1WhJBXHvpZ2jBurxTZTQFO9l5i';

const Compras = () => {
  const [carrito, setCarrito] = useState([]);
  const [paypalReady, setPaypalReady] = useState(false);
  const [pagoRealizado, setPagoRealizado] = useState(false);

  // Agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== productoId));
  };

  // Incrementar cantidad con botón +
  const incrementarCantidad = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Decrementar cantidad con botón -
  const decrementarCantidad = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === productoId && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  // Calcular el total del carrito
  const total = carrito.reduce((acc, item) => acc + parseInt(item.precio) * item.cantidad, 0);

  // Cargar el script del SDK de PayPal
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=USD`;
    script.addEventListener('load', () => setPaypalReady(true));
    document.body.appendChild(script);
  }, []);

  // Renderizar botón de PayPal
  useEffect(() => {
    if (paypalReady && total > 0) {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = ''; // Evita la duplicación del botón
      }

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: 'Compra de productos',
              amount: {
                value: (total / 100).toFixed(2), 
              }
            }]
          });
        },
        onApprove: async (data, actions) => {
          const detalles = await actions.order.capture();
          console.log('Pago completado:', detalles);
          setPagoRealizado(true);
          setCarrito([]); // Limpiar el carrito después del pago
        },
        onError: err => {
          console.error('Error de PayPal:', err);
        }
      }).render('#paypal-button-container');
    }
  }, [paypalReady, total]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CategoryList />
        <div className={styles.productGrid}>
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </div>

      {/* Carrito de compras */}
      <div className={styles.carritoSection}>
        <h3>🧺 Carrito de compras</h3>
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              <span>{item.nombre} - ${item.precio} x {item.cantidad}</span>
              <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
              <button onClick={() => decrementarCantidad(item.id)}>-</button>
              <button onClick={() => incrementarCantidad(item.id)}>+</button>
            </li>
          ))}
        </ul>

        {carrito.length > 0 && (
          <>
            <p><strong>Total:</strong> ${(total / 100).toFixed(2)} USD</p>
            <div id="paypal-button-container" style={{ marginTop: '1rem' }}></div>
          </>
        )}

        {pagoRealizado && (
          <div style={{ marginTop: '1rem', backgroundColor: '#e0ffe0', padding: '1rem' }}>
            <h4>✅ ¡Pago realizado exitosamente!</h4>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <h4>Compra y Ventas Online.Com</h4>
      </footer>
    </div>
  );
};

export default Compras;

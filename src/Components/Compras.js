import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import CategoryList from '../Components/CategoryList';
import styles from '../styles/Compras.module.css';
import TomateImg from '../assets/tomate.jpg';
import ManzanaImg from '../assets/manzana.jpg';
import PapaImg from '../assets/papa.jpg';
import HuevosImg from '../assets/huevos.jpg';
import FrambuesaImg from '../assets/frambuesa.jpg';
import PepinoImg from '../assets/pepino.jpg';
import ZapalloImg from '../assets/zapallo.jpg';
import EspinacaImg from '../assets/espinaca.jpg';
import BrocoliImg from '../assets/brocoli.jpg';

// Lista de productos disponibles
const productos = [
  { id: 1, nombre: 'Tomate Chonto', precio: '3200', img: TomateImg },
  { id: 2, nombre: 'Manzana Roja', precio: '2800', img: ManzanaImg },
  { id: 3, nombre: 'Papa Pastusa', precio: '1900', img: PapaImg },
  { id: 4, nombre: 'Huevos criollos', precio: '6800', img: HuevosImg },
  { id: 5, nombre: 'Frambuesa 250g', precio: '7200', img: FrambuesaImg },
  { id: 6, nombre: 'Pepino Cohombro', precio: '3500', img: PepinoImg },
  { id: 7, nombre: 'Zapallo', precio: '2200', img: ZapalloImg },
  { id: 8, nombre: 'Espinaca', precio: '3500', img: EspinacaImg },
  { id: 9, nombre: 'Brócoli', precio: '4000', img: BrocoliImg },
];

// ID de cliente de PayPal (sandbox o producción)
const CLIENT_ID = 'Ae5M3H5z5TMB1letFpwdxWUw8hTnWZyORC7JzwkkVmMbmU1IpEzSsK1WhJBXHvpZ2jBurxTZTQFO9l5i';

const Compras = () => {
  const [carrito, setCarrito] = useState([]);
  const [paypalReady, setPaypalReady] = useState(false);
  const [pagoRealizado, setPagoRealizado] = useState(false);

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

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== productoId));
  };

  const incrementarCantidad = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decrementarCantidad = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === productoId && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const total = carrito.reduce((acc, item) => acc + parseInt(item.precio) * item.cantidad, 0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=USD`;
    script.addEventListener('load', () => setPaypalReady(true));
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (paypalReady && total > 0) {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: 'Compra de productos',
              amount: {
                currency_code: 'USD',
                value: total.toFixed(2) 
              }
            }]
          });
        },
        onApprove: async (data, actions) => {
          const detalles = await actions.order.capture();
          console.log('Pago completado:', detalles);
          setPagoRealizado(true);
          setCarrito([]);
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
            <p>
              <strong>Total:</strong>{' '}
              {new Intl.NumberFormat('es-US', {
                style: 'currency',
                currency: 'USD'
              }).format(total)}
            </p>
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

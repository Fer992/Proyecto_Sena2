import React from 'react';
import styles from '../styles/ProductCard.module.css'; 

const ProductCard = ({ producto, agregarAlCarrito }) => {
  return (
    <div className={styles.card}>
      <img src={producto.img} alt={producto.nombre} className={styles.image} />
      <h3>{producto.nombre}</h3>
      <p>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(producto.precio)}</p>
      <button onClick={() => agregarAlCarrito(producto)} className={styles.addToCartButton}>
        Agregar
      </button>
    </div>
  );
};

export default ProductCard;
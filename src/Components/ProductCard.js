import React from 'react';
import styles from '../styles/ProductCard.module.css'; 

const ProductCard = ({ producto, agregarAlCarrito }) => {
  return (
    <div className={styles.card}>
      <img src={producto.img} alt={producto.nombre} className={styles.image} />
      <h3>{producto.nombre}</h3>
      <p>{producto.precio}</p>
      <button onClick={() => agregarAlCarrito(producto)} className={styles.addToCartButton}>
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
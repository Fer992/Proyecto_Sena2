import React from 'react';
import styles from '../styles/CategoryList.module.css';

const categorias = ['Frutas', 'Verduras', 'Legumbres', 'Cereales'];

const CategoryList = () => {
  return (
    <div className={styles.categoryList}>
      <h2>Categorías</h2>
      <ul className={styles.list}>
        {categorias.map((categoria, index) => (
          <li key={index} className={styles.listItem}>
            {categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
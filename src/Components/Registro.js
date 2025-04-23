import React from 'react';
import styles from '../styles/Registro.module.css';

const Registro = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Nombre Completo" required />
        <input type="email" placeholder="Correo" required />
        <input type="text" placeholder="Dirección" required />
        <input type="tel" placeholder="Teléfono" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;

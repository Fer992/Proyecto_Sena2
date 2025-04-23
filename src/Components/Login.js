import React from 'react';
import styles from '../styles/Login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <h2>Hola! Inicia Sesión</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
        <button type="submit">Registrate</button>
      </form>
    </div>
  );
};

export default Login;
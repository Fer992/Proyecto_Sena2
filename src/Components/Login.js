import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import Registro from '../Components/Registro';

const Login = () => {
  const [isRegistrese, setIsRegistrese] = useState(false);

  const handleToggle = () => {
    setIsRegistrese(!isRegistrese);
  };

  return (
    <div className={styles.container}>
      <h2>{isRegistrese ? 'Regístrate' : 'Hola! Inicia Sesión'}</h2>
      {!isRegistrese ? (
        <form className={styles.form}>
      <input type="text" placeholder="Usuario" required />
      <input type="password" placeholder="Contraseña" required />
          <button type="submit">Ingresa</button>
        </form>
      ) : (
        <Registro />
      )}
      <div className={styles.buttonContainer}>
        <button onClick={handleToggle} className={styles.toggleButton}>
          {isRegistrese ? 'Ya tengo una cuenta' : 'Regístrate'}
        </button>
      </div>
    </div>
  );
};

export default Login;
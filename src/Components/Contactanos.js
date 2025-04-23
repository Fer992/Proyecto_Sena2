// Contactanos.js
import React, { useState } from 'react';
import styles from '../styles/Contactanos.module.css';

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    tipoMensaje: 'PQR', // PQR por defecto
    mensaje: ''
  });

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío de datos (por ejemplo, hacer una petición a una API)
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="identificacion"
            placeholder="Identificación"
            value={formData.identificacion}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <select
            name="tipoMensaje"
            value={formData.tipoMensaje}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="PQR">PQR</option>
            <option value="Felicitación">Felicitación</option>
            <option value="Denuncia">Trámites</option>
          </select>
          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitButton}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contactanos;

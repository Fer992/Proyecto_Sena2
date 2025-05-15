import React, { useState } from 'react';
import axios from 'axios';  // Importamos Axios
import styles from '../styles/Contactanos.module.css';

const Contactanos = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    correo: '',
    tipoMensaje: 'PQR', // Valor por defecto
    mensaje: ''
  });

  // Función para actualizar los campos a medida que el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizamos el estado de formData con el nuevo valor del campo
    setFormData({
      ...formData,
      [name]: value // Utilizamos el nombre del campo como la clave
    });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos que la página se recargue al enviar el formulario

    // Desestructuramos los datos del formulario
    const { nombre, identificacion, correo, mensaje } = formData;
    
    // Validación simple: verificamos que todos los campos obligatorios estén completos
    if (!nombre || !identificacion || !correo || !mensaje) {
      alert('Por favor completa todos los campos obligatorios.'); // Si falta algún campo, mostramos una alerta
      return; // Salimos de la función si faltan campos
    }

    try {
      // Usamos Axios para enviar los datos al backend
      const response = await axios.post('http://localhost:5000/api/contacto', formData, {
        headers: {
          'Content-Type': 'application/json', // Indicamos que estamos enviando datos en formato JSON
        }
      });

      // Si la respuesta del backend es exitosa, mostramos un mensaje de éxito
      if (response.status === 201) {
        alert('Mensaje enviado correctamente.');
        // Limpiamos los campos del formulario
        setFormData({
          nombre: '',
          identificacion: '',
          correo: '',
          tipoMensaje: 'PQR', // Restablecemos el tipo de mensaje a su valor por defecto
          mensaje: ''
        });
      } else {
        // Si hubo un error en la respuesta, mostramos el mensaje de error
        alert(`Error: ${response.data.message || 'No se pudo enviar el mensaje.'}`);
      }
    } catch (error) {
      // Si ocurre un error al hacer la petición, mostramos el error
      console.error('Error al enviar el formulario:', error);
      alert('Ocurrió un error al enviar el mensaje.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campo para el nombre */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre} // El valor del campo es el estado actual de 'nombre'
            onChange={handleChange} // Actualizamos el estado cuando cambia el valor
            required // Este campo es obligatorio
            className={styles.input}
          />
          
          {/* Campo para la identificación */}
          <input
            type="text"
            name="identificacion"
            placeholder="Identificación"
            value={formData.identificacion}
            onChange={handleChange}
            required
            className={styles.input}
          />
          
          {/* Campo para el correo */}
          <input
            type="text"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
            className={styles.input}
          />
          
          {/* Selector de tipo de mensaje */}
          <select
            name="tipoMensaje"
            value={formData.tipoMensaje}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="PQR">PQR</option>
            <option value="Felicitación">Felicitación</option>
            <option value="Denuncia">Denuncia</option>
            <option value="Ventas">Ventas</option>
          </select>
          
          {/* Campo para el mensaje */}
          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
          
          {/* Botón de envío del formulario */}
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactanos;

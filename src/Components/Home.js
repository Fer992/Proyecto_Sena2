import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaTag, FaCreditCard, FaUndo } from 'react-icons/fa'; // Importando iconos
import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.titleContainer}>
        <p>
          Expande tus ventas <br />
          <b>Con esta página Web</b>
        </p>
        <p>
          Con el mejor equipo <br />
          <b>de Marketing de la Región</b>
        </p>
      </div>
      <div>
        <Link to="/Contactanos" className={styles.callToAction}>
          Contáctanos
        </Link>
        <Link to="/Login" className={styles.callToAction}>
          Regístrate
        </Link>
      </div>

      {/* Cajones (cards) */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <FaTag className={styles.icon} />
          <h3>Ofertas del Día</h3>
          <p>Aprovecha nuestras increíbles promociones diarias</p>
        </div>
        <div className={styles.card}>
          <FaCreditCard className={styles.icon} />
          <h3>Medios de Pago</h3>
          <p>Aceptamos múltiples formas de pago seguras</p>
        </div>
        <div className={styles.card}>
          <FaUndo className={styles.icon} />
          <h3>Políticas de Devoluciones</h3>
          <p>Devoluciones fáciles y rápidas en 30 días</p>
        </div>
      </div>
      {/* Pie de página */}
      <div className={styles.footer}>
        <p>Proyecto Sena ADSO 2025</p>
        <p><b>TiendaVirtualBalue</b></p>
      </div>
    </div>
  );
}

export default Home;

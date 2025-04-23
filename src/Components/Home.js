import React from 'react';
import { Link } from 'react-scroll'; // Asegúrate de importar Link desde react-scroll
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
        <Link to="./Contactanos" smooth duration={500} className={styles.callToAction}>
          Contáctanos
        </Link>
        <Link to="./Login" smooth duration={500} className={styles.callToAction}>
          Regístrate
        </Link>
      </div>
    </div>
  );
}

export default Home;

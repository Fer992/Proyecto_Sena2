import React from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import styles from "../styles/Menu.module.css";

const Menu = () => {
  return (
    <div>
      <div className={styles.header}>
        {/* Puedes agregar contenido dentro de este div si es necesario */}
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav}>
          <li>
            <Link to="/">Home</Link> {/* Usa Link en lugar de a */}
          </li>
          <li>
            <Link to="/Login">Ingreso Usuario</Link>
          </li>
          <li>
            <Link to="/Compras">Compra y Vende</Link>
          </li>
          <li>
            <Link to="/Contactanos">Contactanos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;

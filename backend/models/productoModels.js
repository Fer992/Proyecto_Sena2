const connection = require('../config/db');

const Producto = {
  // Crear un nuevo producto
  crear: (data, callback) => {
    const query = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
    connection.query(query, [data.nombre, data.descripcion, data.precio, data.stock], callback);
  },

  // Obtener todos los productos
  obtenerTodos: (callback) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, callback);
  },

  // Obtener un producto por ID
  obtenerPorId: (id, callback) => {
    const query = 'SELECT * FROM productos WHERE id = ?';
    connection.query(query, [id], callback);
  },

  // Actualizar un producto por ID
  actualizar: (id, data, callback) => {
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?';
    connection.query(query, [data.nombre, data.descripcion, data.precio, data.stock, id], callback);
  },

  // Eliminar un producto por ID
  eliminar: (id, callback) => {
    const query = 'DELETE FROM productos WHERE id = ?';
    connection.query(query, [id], callback);
  }
};

module.exports = Producto;

const Producto = require('../models/productoModels');

exports.crearProducto = (req, res) => {
  Producto.crear(req.body, (error, results) => {
    if (error) {
      return res.status(500).send('Error al crear el producto');
    }
    res.status(201).send(`Producto creado con ID: ${results.insertId}`);
  });
};

exports.obtenerProductos = (req, res) => {
  Producto.obtenerTodos((error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener productos');
    }
    res.json(results);
  });
};

exports.obtenerProductosPorId = (req, res) => {
  const id = req.params.id;
  Producto.obtenerPorId(id, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener el producto');
    }
    if (results.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(results);
  });
};

exports.actualizarProducto = (req, res) => {
  const id = req.params.id;
  Producto.actualizar(id, req.body, (error, results) => {
    if (error) {
      return res.status(500).send('Error al actualizar el producto');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send('Producto actualizado correctamente');
  });
};

exports.eliminarProducto = (req, res) => {
  const id = req.params.id;
  Producto.eliminar(id, (error, results) => {
    if (error) {
      return res.status(500).send('Error al eliminar el producto');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send('Producto eliminado correctamente');
  });
};

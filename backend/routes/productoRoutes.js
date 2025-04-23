const express = require('express');
const router = express.Router();
const productoController = require('../controller/productoController');  

// Crear un nuevo producto
router.post('/', productoController.crearProducto);

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Obtener un producto por ID
router.get('/:id', productoController.obtenerProductosPorId);

// Actualizar un producto por ID
router.put('/:id', productoController.actualizarProducto);

// Eliminar un producto por ID
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;

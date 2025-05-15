// Importar dependencias necesarias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const contactoRoutes = require('./routes/contactoRoutes');

// Cargar variables de entorno
dotenv.config();

// Crear una nueva aplicación Express
const app = express();

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.io con una ruta personalizada (opcional)
const io = socketIo(server, {
  path: '/ws', // Ruta personalizada para WebSocket
});

// Middleware
app.use(cors()); // Para habilitar solicitudes CORS
app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON
// Elimina la línea que servía para archivos estáticos (como imágenes)
// app.use('/uploads', express.static('uploads')); // Ya no es necesario si no manejas imágenes
app.use('/api/contacto', contactoRoutes); // Montar las rutas de contacto

// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Detener la app si no se puede conectar
  });

// Configuración de eventos de Socket.io (opcional)
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escuchar un evento de mensaje
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
    socket.emit('respuesta', 'Mensaje recibido correctamente');
  });

  // Manejar la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Un cliente se desconectó');
  });
});

// Configuración del puerto y puesta en marcha del servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

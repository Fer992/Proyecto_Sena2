// Importa mongoose para poder definir el esquema y el modelo
const mongoose = require('mongoose');

// Define el esquema de 'contacto'. Un esquema define la estructura de los documentos.
const contactoSchema = new mongoose.Schema({
  // Campo 'nombre' debe ser una cadena de texto y es obligatorio
  nombre: {
    type: String,
    required: true, // Asegura que siempre se proporcione un nombre
    trim: true       // Elimina espacios en blanco al inicio y al final del nombre
  },
  
  // Campo 'identificacion' debe ser una cadena de texto y es obligatorio
  identificacion: {
    type: String,
    required: true,  // Asegura que siempre se proporcione una identificación
    trim: true       // Elimina espacios en blanco
  },
  // Campo 'correo' debe ser una cadena de texto y es obligatorio
  correo: {
    type: String,
    required: true,  // Asegura que siempre se proporcione un correo
    trim: true,      // Elimina espacios en blanco
    lowercase: true, // Convierte el correo a minúsculas antes de guardarlo
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un correo válido'] // Valida que el formato sea de correo
  },
  
  // Campo 'tipoMensaje' es una cadena de texto que indica el tipo de mensaje (por ejemplo: PQR, Denuncia, etc.)
  tipoMensaje: {
    type: String,
    required: true,  // Asegura que siempre se proporcione un tipo de mensaje
    enum: ['PQR', 'Felicitación', 'Denuncia', 'Ventas', 'Otro'], // Los valores permitidos
    default: 'PQR'   // Si no se proporciona un tipo, por defecto será 'PQR'
  },

  // Campo 'mensaje' es una cadena de texto donde se almacena el contenido del mensaje
  mensaje: {
    type: String,
    required: true,  // Asegura que siempre se proporcione un mensaje
    trim: true       // Elimina espacios en blanco
  },
});

// Crea un modelo de Mongoose llamado 'Contacto' a partir del esquema definido
module.exports = mongoose.model('Contacto', contactoSchema);

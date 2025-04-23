const mysql = require('mysql2'); 

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiendavirtual',
  port: 3306
});

// Conectar a la base de datos
connection.connect(function(err) {
  if (err) {
    console.log('Error al conectar a MySQL: ', err);
    return;
  }
  // Imprimir correctamente el nombre de la base de datos
  console.log('Conectado a la base de datos: ', connection.config.database);
});

// Exportar la conexión para utilizarla en otros archivos
module.exports = connection;

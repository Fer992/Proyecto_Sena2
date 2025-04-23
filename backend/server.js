const express = require('express');
const cors = require('cors')
const productoRoutes = require('./routes/productoRoutes.js')

const app = express();

app.use(cors());

app.use(express.json());

app.use('./productos', productoRoutes);

const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en https://localhost:${PORT}`);
});


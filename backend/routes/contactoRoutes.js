const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto'); // Tu modelo de base de datos
const PDFDocument = require('pdfkit');


// Ruta POST para guardar los datos del formulario
router.post('/', async (req, res) => {
  try {
    const nuevoContacto = new Contacto({
      nombre: req.body.nombre,
      correo: req.body.correo,
      identificacion: req.body.identificacion,
      tipoMensaje: req.body.tipoMensaje,
      mensaje: req.body.mensaje,
    });

    // Guardar el contacto en la base de datos
    await nuevoContacto.save();

    res.status(201).json({ mensaje: 'Mensaje recibido con éxito' });
  } catch (error) {
    console.error('Error al guardar el contacto:', error.message);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

// Ruta GET para generar un PDF con los datos de contacto almacenados
router.get('/pdf', async (req, res) => {
  try {
    // Recuperar todos los contactos de la base de datos
    const contactos = await Contacto.find();

    // Crear un documento PDF
    const doc = new PDFDocument();

    // Nombre del archivo PDF
    const filename = 'contactos.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Pipe el PDF al response para enviarlo directamente al cliente
    doc.pipe(res);

    // Agregar los datos al PDF
    doc.fontSize(18).text('Lista de Contactos:', { align: 'center' });
    doc.moveDown();

    // Recorrer todos los contactos y agregarlos al PDF
    contactos.forEach(contacto => {
      doc.fontSize(12).text(`Nombre: ${contacto.nombre}`);
      doc.text(`Correo: ${contacto.correo}`);
      doc.text(`Identificación: ${contacto.identificacion}`);
      doc.text(`Tipo de Mensaje: ${contacto.tipoMensaje}`);
      doc.text(`Mensaje: ${contacto.mensaje}`);
      doc.moveDown();
    });

    // Finalizar el documento PDF
    doc.end();
  } catch (error) {
    console.error('Error al generar el PDF:', error.message);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
});

module.exports = router;

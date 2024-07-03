const express = require('express');
const router = express.Router();
const Diagram = require('../models/Diagram');

// Obtener todos los diagramas
router.get('/', async (req, res) => {
  const diagrams = await Diagram.find().populate('productId').populate('components.componentId');
  res.json(diagrams);
});

// Crear un nuevo diagrama
router.post('/', async (req, res) => {
  const { name, productId, components, demand } = req.body; // Asegúrate de incluir name aquí
  const newDiagram = new Diagram({ name, productId, components, demand }); // Asegúrate de pasar name al constructor
  try {
    await newDiagram.save();
    res.status(201).json({ message: 'Diagrama guardado' });
  } catch (error) {
    console.error('Error al guardar el diagrama:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obtener un diagrama por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const diagram = await Diagram.findById(id).populate('productId').populate('components.componentId');
  res.json(diagram);
});

module.exports = router;

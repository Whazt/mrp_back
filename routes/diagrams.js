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
  const { name, productId, components, demand } = req.body;
  const newDiagram = new Diagram({ name, productId, components, demand });
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

// Eliminar un diagrama por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Diagram.findByIdAndDelete(id);
    res.status(200).json({ message: 'Diagrama eliminado' });
  } catch (error) {
    console.error('Error al eliminar el diagrama:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

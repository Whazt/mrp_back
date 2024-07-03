const express = require('express');
const router = express.Router();
const Component = require('../models/Component');

// Obtener todos los componentes
router.get('/', async (req, res) => {
  const components = await Component.find();
  res.json(components);
});

// Crear un nuevo componente
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newComponent = new Component({ name });
  await newComponent.save();
  res.status(201).json({ message: 'Componente agregado' });
});

// Obtener un componente por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const component = await Component.findById(id);
  res.json(component);
});

// Eliminar un componente por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Component.findByIdAndDelete(id);
  res.status(200).json({ message: 'Componente eliminado' });
});

module.exports = router;

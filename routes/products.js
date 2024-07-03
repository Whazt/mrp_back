const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Obtener todos los productos
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newProduct = new Product({ name });
  await newProduct.save();
  res.status(201).json({ message: 'Producto agregado' });
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json({ message: 'Producto eliminado' });
});

module.exports = router;

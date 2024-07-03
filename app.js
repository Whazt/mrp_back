const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productRoutes = require('./routes/products');
const componentRoutes = require('./routes/components');
const diagramRoutes = require('./routes/diagrams');

app.use('/api/products', productRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/diagrams', diagramRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

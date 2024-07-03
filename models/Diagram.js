const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  componentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
  quantity: { type: Number, required: true },
});

const diagramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  components: [componentSchema],
  demand: { type: Number, required: true }
});

module.exports = mongoose.model('Diagram', diagramSchema);

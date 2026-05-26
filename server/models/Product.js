const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Fashion', 'Home', 'Books']
  },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, default: null },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  badge: { type: String, enum: ['Sale', 'New', null], default: null },
  emoji: { type: String, default: '📦' },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

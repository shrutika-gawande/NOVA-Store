const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
// Query params: category, minPrice, maxPrice, minRating, sort, search
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, sort, search } = req.query;

    const filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let sortObj = {};
    if (sort === 'price-asc') sortObj = { price: 1 };
    else if (sort === 'price-desc') sortObj = { price: -1 };
    else if (sort === 'rating-desc') sortObj = { rating: -1 };
    else sortObj = { createdAt: -1 };

    const products = await Product.find(filter).sort(sortObj);
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/meta/categories
router.get('/meta/categories', async (req, res) => {
  try {
    const counts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const total = await Product.countDocuments();
    res.json({ success: true, data: { total, categories: counts } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

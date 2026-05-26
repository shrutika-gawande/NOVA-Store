const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // Electronics
  { name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 2999, oldPrice: 4999, rating: 4.7, reviews: 312, badge: 'Sale', emoji: '🎧' },
  { name: 'Smart Watch Pro 5 Series', category: 'Electronics', price: 3499, oldPrice: 5499, rating: 4.5, reviews: 214, badge: 'Sale', emoji: '⌚' },
  { name: '4K Ultra HD Action Camera', category: 'Electronics', price: 4499, oldPrice: null, rating: 4.6, reviews: 178, badge: null, emoji: '📷' },
  { name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 1499, oldPrice: 1999, rating: 4.4, reviews: 509, badge: 'Sale', emoji: '🔊' },
  { name: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 2299, oldPrice: null, rating: 4.8, reviews: 423, badge: 'New', emoji: '⌨️' },
  { name: 'USB-C Hub 7-in-1', category: 'Electronics', price: 999, oldPrice: 1499, rating: 4.3, reviews: 287, badge: 'Sale', emoji: '🔌' },
  // Fashion
  { name: 'Oversized Linen Blazer', category: 'Fashion', price: 1899, oldPrice: 2999, rating: 4.6, reviews: 142, badge: 'Sale', emoji: '🧥' },
  { name: 'Premium Leather Sneakers', category: 'Fashion', price: 2799, oldPrice: null, rating: 4.5, reviews: 218, badge: 'New', emoji: '👟' },
  { name: 'Minimalist Canvas Tote Bag', category: 'Fashion', price: 699, oldPrice: 999, rating: 4.4, reviews: 376, badge: 'Sale', emoji: '👜' },
  { name: 'Slim Fit Chinos 3 Colours', category: 'Fashion', price: 1199, oldPrice: null, rating: 4.3, reviews: 291, badge: null, emoji: '👖' },
  { name: 'Embroidered Cotton Kurta', category: 'Fashion', price: 849, oldPrice: 1299, rating: 4.7, reviews: 534, badge: 'Sale', emoji: '👕' },
  { name: 'Round Frame UV Sunglasses', category: 'Fashion', price: 549, oldPrice: 899, rating: 4.2, reviews: 193, badge: 'Sale', emoji: '🕶️' },
  // Home
  { name: 'Robot Vacuum Cleaner Wi-Fi', category: 'Home', price: 4999, oldPrice: 7999, rating: 4.6, reviews: 167, badge: 'Sale', emoji: '🤖' },
  { name: 'Air Fryer 5L Digital', category: 'Home', price: 2799, oldPrice: 3499, rating: 4.7, reviews: 428, badge: 'Sale', emoji: '🍳' },
  { name: 'Smart LED Floor Lamp', category: 'Home', price: 1599, oldPrice: null, rating: 4.4, reviews: 213, badge: 'New', emoji: '💡' },
  { name: 'Cold Brew Coffee Maker', category: 'Home', price: 1299, oldPrice: 1799, rating: 4.5, reviews: 312, badge: 'Sale', emoji: '☕' },
  { name: 'Bamboo Bedsheet Set King', category: 'Home', price: 1899, oldPrice: 2499, rating: 4.6, reviews: 187, badge: 'Sale', emoji: '🛏️' },
  { name: 'Ceramic Non-stick Cookware Set', category: 'Home', price: 3499, oldPrice: null, rating: 4.8, reviews: 267, badge: 'New', emoji: '🍲' },
  // Books
  { name: 'Atomic Habits — James Clear', category: 'Books', price: 349, oldPrice: 499, rating: 4.9, reviews: 1204, badge: 'Sale', emoji: '📖' },
  { name: 'The Psychology of Money', category: 'Books', price: 299, oldPrice: 399, rating: 4.8, reviews: 934, badge: 'Sale', emoji: '💰' },
  { name: 'Deep Work — Cal Newport', category: 'Books', price: 279, oldPrice: null, rating: 4.7, reviews: 612, badge: null, emoji: '🧠' },
  { name: 'Sapiens: A Brief History', category: 'Books', price: 399, oldPrice: 599, rating: 4.8, reviews: 2103, badge: 'Sale', emoji: '🏛️' },
  { name: 'The Almanack of Naval Ravikant', category: 'Books', price: 249, oldPrice: 399, rating: 4.7, reviews: 876, badge: 'Sale', emoji: '⚓' },
  { name: 'Zero to One — Peter Thiel', category: 'Books', price: 329, oldPrice: null, rating: 4.6, reviews: 723, badge: null, emoji: '🚀' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();

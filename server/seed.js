const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
dotenv.config();

const products = [
  // Electronics
  { id:1, name:'Wireless Noise-Cancelling Headphones', category:'Electronics', price:2999, oldPrice:4999, rating:4.7, reviews:312, badge:'Sale', emoji:'./products/headphone.png' },
  { id:2, name:'Smart Watch Pro 5 Series', category:'Electronics', price:3499, oldPrice:5499, rating:4.5, reviews:214, badge:'Sale', emoji:'./products/watch.png' },
  { id:3, name:'4K Ultra HD Action Camera', category:'Electronics', price:4499, oldPrice:null, rating:4.6, reviews:178, badge:null, emoji:'./products/Camera.png' },
  { id:4, name:'Portable Bluetooth Speaker', category:'Electronics', price:1499, oldPrice:1999, rating:4.4, reviews:509, badge:'Sale', emoji:'./products/speaker.png' },
  { id:5, name:'Mechanical Gaming Keyboard', category:'Electronics', price:2299, oldPrice:null, rating:4.8, reviews:423, badge:'New', emoji:'./products/keyboard.png' },
  { id:6, name:'USB-C Hub 7-in-1', category:'Electronics', price:999, oldPrice:1499, rating:4.3, reviews:287, badge:'Sale', emoji:'./products/USB-hub.png' },
  // Fashion
  { id:7, name:'Oversized Linen Blazer', category:'Fashion', price:1899, oldPrice:2999, rating:4.6, reviews:142, badge:'Sale', emoji:'./products/linen-blazer.png' },
  { id:8, name:'Premium Leather Sneakers', category:'Fashion', price:2799, oldPrice:null, rating:4.5, reviews:218, badge:'New', emoji:'./products/sneakers.png' },
  { id:9, name:'Minimalist Canvas Tote Bag', category:'Fashion', price:699, oldPrice:999, rating:4.4, reviews:376, badge:'Sale', emoji:'./products/Tote-Bag.png' },
  { id:10, name:'Slim Fit Chinos (3 Colours)', category:'Fashion', price:1199, oldPrice:null, rating:4.3, reviews:291, badge:null, emoji:'./products/Slim-Fit-Chinos.png' },
  { id:11, name:'Embroidered Cotton Kurta', category:'Fashion', price:849, oldPrice:1299, rating:4.7, reviews:534, badge:'Sale', emoji:'./products/Cotton-Kurta.png' },
  { id:12, name:'Round Frame UV Sunglasses', category:'Fashion', price:549, oldPrice:899, rating:4.2, reviews:193, badge:'Sale', emoji:'./products/Sunglasses.png' },
  // Home
  { id:13, name:'Robot Vacuum Cleaner Wi-Fi', category:'Home', price:4999, oldPrice:7999, rating:4.6, reviews:167, badge:'Sale', emoji:'./products/Vacuum-Cleaner.png' },
  { id:14, name:'Air Fryer 5L Digital', category:'Home', price:2799, oldPrice:3499, rating:4.7, reviews:428, badge:'Sale', emoji:'./products/Air-Fryer.png' },
  { id:15, name:'Smart LED Floor Lamp', category:'Home', price:1599, oldPrice:null, rating:4.4, reviews:213, badge:'New', emoji:'./products/LED-Floor-Lamp.png' },
  { id:16, name:'Cold Brew Coffee Maker', category:'Home', price:1299, oldPrice:1799, rating:4.5, reviews:312, badge:'Sale', emoji:'./products/Coffee-Maker.png' },
  { id:17, name:'Bamboo Bedsheet Set King', category:'Home', price:1899, oldPrice:2499, rating:4.6, reviews:187, badge:'Sale', emoji:'./products/Bedsheet.png' },
  { id:18, name:'Ceramic Non-stick Cookware Set', category:'Home', price:3499, oldPrice:null, rating:4.8, reviews:267, badge:'New', emoji:'./products/Cookware-Set.png' },
  // Books
  { id:19, name:'Atomic Habits — James Clear', category:'Books', price:349, oldPrice:499, rating:4.9, reviews:1204, badge:'Sale', emoji:'./products/Atomic-Habits.png' },
  { id:20, name:'The Psychology of Money', category:'Books', price:299, oldPrice:399, rating:4.8, reviews:934, badge:'Sale', emoji:'./products/The-Psychology-of-Money.png' },
  { id:21, name:'Deep Work — Cal Newport', category:'Books', price:279, oldPrice:null, rating:4.7, reviews:612, badge:null, emoji:'./products/Deep-Work.png' },
  { id:22, name:'Sapiens: A Brief History', category:'Books', price:399, oldPrice:599, rating:4.8, reviews:2103, badge:'Sale', emoji:'./products/Sapiens.png' },
  { id:23, name:'The Almanack of Naval Ravikant', category:'Books', price:249, oldPrice:399, rating:4.7, reviews:876, badge:'Sale', emoji:'./products/Almanack.png' },
  { id:24, name:'Zero to One — Peter Thiel', category:'Books', price:329, oldPrice:null, rating:4.6, reviews:723, badge:null, emoji:'./products/Zero-to-One.png' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ 24 products seeded');
  if (!await User.findOne({ email: 'admin@nova.com' })) {
    await User.create({ name: 'Admin', email: 'admin@nova.com', password: 'admin123', role: 'admin' });
    console.log('✅ Admin → admin@nova.com / admin123');
  }
  if (!await User.findOne({ email: 'user@nova.com' })) {
    await User.create({ name: 'Demo User', email: 'user@nova.com', password: 'user1234', role: 'customer' });
    console.log('✅ Customer → user@nova.com / user1234');
  }
  process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });

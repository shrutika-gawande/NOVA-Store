# 🛍️ NOVA Store — Full Stack MERN

A complete e-commerce platform with customer storefront, checkout, order tracking, and a full admin panel.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB running locally (`mongod`) OR a free [MongoDB Atlas](https://mongodb.com/atlas) cluster

### 1. Clone & Install

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 2. Configure Environment

Edit `server/.env` (already pre-filled for local dev):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/novastore
JWT_SECRET=nova_super_secret_jwt_key_2025
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Seed the Database

```bash
cd server
node seed.js
```

Output:
```
✅ MongoDB connected
✅ 24 products seeded
✅ Admin → admin@nova.com / admin123
✅ Customer → user@nova.com / user1234
```

### 4. Run Both Servers

**Terminal 1 — Backend:**
```bash
cd server && node index.js
# 🚀 Server → http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client && npm run dev
# ➜ Local: http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🔑 Demo Credentials

| Role     | Email             | Password   |
|----------|-------------------|------------|
| Admin    | admin@nova.com    | admin123   |
| Customer | user@nova.com     | user1234   |

---

## 📁 Project Structure

```
nova-store/
├── server/                        ← Express + MongoDB Backend
│   ├── index.js                   ← Entry point
│   ├── seed.js                    ← DB seeder
│   ├── middleware/
│   │   └── auth.js                ← JWT protect + adminOnly
│   ├── models/
│   │   ├── Product.js             ← Product schema
│   │   ├── User.js                ← User schema (bcrypt, roles)
│   │   └── Order.js               ← Order schema (status history)
│   └── routes/
│       ├── auth.js                ← /api/auth (login, register, me)
│       ├── products.js            ← /api/products (filter, sort, search)
│       ├── orders.js              ← /api/orders (place, track, admin)
│       └── admin.js               ← /api/admin (product CRUD, users)
│
└── client/                        ← React 18 + Vite Frontend
    └── src/
        ├── App.jsx                ← Router with protected routes
        ├── context/
        │   ├── AuthContext.jsx    ← JWT auth state
        │   └── CartContext.jsx    ← Cart state (useReducer)
        ├── services/api.js        ← All Axios calls (auto auth header)
        ├── hooks/useProducts.js   ← Product fetch + filter logic
        ├── components/
        │   ├── Header.jsx         ← Nav with auth links
        │   ├── Hero.jsx           ← Banner + ticker
        │   ├── Sidebar.jsx        ← Filters + sort
        │   ├── ProductCard.jsx    ← Product card
        │   ├── ProductGrid.jsx    ← Grid/list + skeletons
        │   ├── CartDrawer.jsx     ← Slide-in cart
        │   └── ProtectedRoute.jsx ← Auth + admin guards
        └── pages/
            ├── HomePage.jsx       ← Store front
            ├── AuthPage.jsx       ← Login / Register
            ├── CheckoutPage.jsx   ← 4-step checkout
            ├── MyOrdersPage.jsx   ← Customer order history
            └── admin/
                ├── AdminLayout.jsx     ← Sidebar + nav
                ├── AdminDashboard.jsx  ← Stats & charts
                ├── AdminOrders.jsx     ← Order management
                ├── AdminProducts.jsx   ← Product CRUD
                └── AdminUsers.jsx      ← User list
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET  | `/api/auth/me` | Get logged-in user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List with filter/sort/search |
| GET | `/api/products/:id` | Single product |
| GET | `/api/products/meta/categories` | Category counts |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | Customer | Place order |
| GET  | `/api/orders/my` | Customer | My orders |
| GET  | `/api/orders/:id` | Owner/Admin | Order detail |
| GET  | `/api/orders` | Admin | All orders |
| PATCH | `/api/orders/:id/status` | Admin | Update status |
| DELETE | `/api/orders/:id` | Admin | Delete order |
| GET  | `/api/orders/admin/stats` | Admin | Dashboard stats |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin` | Create product |
| PATCH | `/api/admin/:id` | Update product |
| DELETE | `/api/admin/:id` | Delete product |
| GET | `/api/admin/users` | List all users |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Database | MongoDB + Mongoose |
| Backend | Node.js + Express |
| Authentication | JWT + bcryptjs |
| Frontend | React 18 + Vite |
| State | Context API + useReducer |
| HTTP | Axios (with auth interceptor) |
| Routing | React Router v6 |
| Notifications | react-hot-toast |
| Styling | CSS Modules |

---

## 🌐 Deployment

| Service | Use For |
|---------|---------|
| [Render](https://nova-store-t8r2.onrender.com) | Node.js backend (free tier) |
| [Vercel](https://nova-store-two-fawn.vercel.app/) | React frontend |
| [MongoDB Atlas](https://cloud.mongodb.com/v2/6a15213f12cc7b9b005da306#/explorer/6a152158f51d49c07c003532/test) | Cloud database |

Set `MONGO_URI` and `JWT_SECRET` as environment variables in your deployment platform.

---

## 📊 Evaluation Criteria Coverage

| Criteria | Weight | Implementation |
|----------|--------|----------------|
| Design Quality | 25% | Dark luxury theme, CSS Modules, animations, responsive |
| Functionality | 25% | Full CRUD, auth, orders, checkout, admin panel |
| Code Quality | 20% | Custom hooks, context, clean separation of concerns |
| GitHub Usage | 15% | Commit regularly — `git commit -m "feat: add checkout"` |
| Presentation | 15% | Deploy on Render + Vercel, demo all features |

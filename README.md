<p align="center">
  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="Flipkart Logo" width="200"/>
</p>

<h1 align="center">Flipkart Clone — Full-Stack E-Commerce</h1>

<p align="center">
  A production-quality, full-stack e-commerce web application modeled after <strong>Flipkart</strong>, built with React, Node.js, Express, and MySQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Application Flows](#-application-flows)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Category | Features |
|----------|----------|
| **Product Catalog** | 100 products across 6 categories, image carousels, category filtering, keyword search, pagination |
| **Shopping Cart** | Add/remove items, quantity management, upsert logic (duplicate adds increment qty), persistent server state |
| **Wishlist** | Save/unsave products, heart toggle animation, dedicated wishlist page |
| **Orders** | Checkout with shipping form, transactional order placement, order confirmation page, order history |
| **UI/UX** | Flipkart-style blue navbar, responsive grid (1-4 columns), skeleton loaders, toast notifications, hover zoom on images, discount badges, star ratings |
| **Architecture** | REST API, MySQL connection pooling, React Context for global state, Axios HTTP client, Vite dev proxy |

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI with hooks |
| **Vite 5** | Lightning-fast dev server & build tool |
| **Tailwind CSS 3** | Utility-first responsive styling |
| **React Router DOM 6** | Client-side routing |
| **Axios** | HTTP client for API communication |
| **React Context API** | Global cart state management |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js + Express 4** | RESTful API server |
| **mysql2/promise** | Async MySQL driver with connection pooling |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **nodemon** | Auto-restart during development |

### Database

| Technology | Purpose |
|------------|---------|
| **MySQL 8.0+** | Relational database (6 normalized tables) |

---

## 📁 Project Structure

```
flipkart-clone/
|
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL connection pool (mysql2/promise)
│   ├── controllers/
│   │   ├── productController.js  # Search, filter, pagination, detail
│   │   ├── cartController.js     # CRUD + upsert (ON DUPLICATE KEY)
│   │   ├── orderController.js    # Transactional order placement
│   │   └── wishlistController.js # Add / remove / list
│   ├── middleware/
│   │   └── errorHandler.js       # Global error handler
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── wishlistRoutes.js
│   ├── seed/
│   │   ├── seedProducts.sql      # Schema + 20 initial products
│   │   └── seedMore.sql          # 80 additional products (total: 100)
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express entry point
|
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Blue Flipkart-style navbar with cart badge
│   │   │   ├── ProductCard.jsx   # Product card with hover effects
│   │   │   ├── ProductGrid.jsx   # Responsive product grid layout
│   │   │   ├── CartItem.jsx      # Cart row with quantity controls
│   │   │   ├── SearchBar.jsx     # Category filter chips
│   │   │   ├── WishlistButton.jsx# Heart toggle icon
│   │   │   ├── SkeletonLoader.jsx# Loading placeholder animations
│   │   │   └── ToastProvider.jsx # Toast notification system
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Product listing + filters + search
│   │   │   ├── ProductDetail.jsx # Detail page with image carousel
│   │   │   ├── Cart.jsx          # Shopping cart page
│   │   │   ├── Checkout.jsx      # Shipping form + order placement
│   │   │   ├── OrderSuccess.jsx  # Order confirmation
│   │   │   └── Wishlist.jsx      # Saved products page
│   │   ├── context/
│   │   │   └── CartContext.jsx   # Global cart state (Context API)
│   │   ├── services/
│   │   │   └── api.js            # Axios HTTP client
│   │   ├── App.jsx               # Root layout + routing
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Tailwind imports + custom animations
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
|
├── .gitignore
└── README.md
```

---

## 🗃 Database Schema

### Entity-Relationship Diagram

```
products ──< product_images   (1:N — one product has many carousel images)
products ──< cart              (1:N — a product can be in many user carts)
products ──< wishlist          (1:N — a product can be wishlisted by many users)
products ──< order_items       (1:N — a product can appear in many order items)
orders   ──< order_items       (1:N — one order contains many line items)
```

### Tables

| Table | Purpose | Key Constraints |
|-------|---------|-----------------|
| `products` | Product catalog (name, price, stock, rating, discount) | PK: `id` |
| `product_images` | Carousel images per product | FK: `product_id → products.id` |
| `cart` | Per-user shopping cart | UNIQUE: `(user_id, product_id)` |
| `orders` | Order header (total, shipping info) | PK: `id` |
| `order_items` | Line items belonging to an order | FK: `order_id`, `product_id` |
| `wishlist` | Saved-for-later products | UNIQUE: `(user_id, product_id)` |

### Design Decisions

- **UNIQUE constraint on cart `(user_id, product_id)`** — enables `INSERT … ON DUPLICATE KEY UPDATE` for cart upsert logic. Adding the same product again increments quantity instead of creating a duplicate row.
- **Separate `order_items` table** — normalized design avoids storing JSON arrays. Each line item has its own row with the price captured at time of purchase (price-locking).
- **`product_images` table** — supports image carousels without bloating the products table.

---

## 🔌 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products?search=keyword` | Search by name |
| `GET` | `/api/products?category=mobiles` | Filter by category |
| `GET` | `/api/products?page=1&limit=8` | Paginated results |
| `GET` | `/api/products/categories` | Get all category names |
| `GET` | `/api/products/:id` | Single product with images |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get all cart items (joined with product info) |
| `POST` | `/api/cart` | Add product `{ product_id, quantity }` |
| `PUT` | `/api/cart/:id` | Update quantity `{ quantity }` |
| `DELETE` | `/api/cart/:id` | Remove item from cart |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Place order from cart (transactional) |
| `GET` | `/api/orders/user` | All orders for current user |
| `GET` | `/api/orders/:id` | Single order with line items |

### Wishlist

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlist` | Get all wishlist items |
| `POST` | `/api/wishlist` | Add to wishlist `{ product_id }` |
| `DELETE` | `/api/wishlist/:id` | Remove from wishlist |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MySQL** 8.0 or higher (running locally or cloud instance)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/anmolsalaria/flipkart-clone.git
cd flipkart-clone
```

### 2. Set Up the Database

```bash
# Log into MySQL and run the seed scripts
mysql -u root -p < backend/seed/seedProducts.sql
mysql -u root -p flipkart_clone < backend/seed/seedMore.sql
```

This creates the `flipkart_clone` database with 6 tables and seeds **100 products** with **257 images** across 6 categories:

| Category | Products |
|----------|----------|
| Mobiles | 18 |
| Electronics | 18 |
| Fashion | 18 |
| Appliances | 17 |
| Home | 16 |
| Accessories | 13 |

### 3. Configure Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your MySQL credentials

# Frontend
cp frontend/.env.example frontend/.env
# Update if your backend runs on a different port
```

### 4. Install Dependencies & Start

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev       # Starts on http://localhost:5001

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev       # Starts on http://localhost:5173
```

### 5. Open in Browser

Navigate to **http://localhost:5173** and start browsing!

> **Note (macOS):** Port 5000 is often occupied by AirPlay Receiver. The backend defaults to port 5001 to avoid this conflict.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=flipkart_clone
DB_PORT=3306
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5001/api
```

---

## 🔄 Application Flows

### Cart Flow

```
User clicks "Add to Cart"
  → POST /api/cart { product_id, quantity: 1 }
    → INSERT ... ON DUPLICATE KEY UPDATE (upsert)
      → Returns full updated cart (JOINed with product details)
        → CartContext updates → Navbar badge re-renders
```

### Order Placement Flow

```
User fills shipping form → POST /api/orders
  → BEGIN TRANSACTION
    → Fetch cart items with prices
    → Calculate total_amount = Σ(price × quantity)
    → INSERT INTO orders (header)
    → INSERT INTO order_items (line items)
    → DELETE FROM cart (clear cart)
  → COMMIT (or ROLLBACK on failure)
    → Frontend clears CartContext → Redirect to /order-success/:id
```

### Frontend ↔ Backend Communication

- All HTTP requests go through `src/services/api.js` (centralized Axios instance)
- In development, Vite proxies `/api/*` to the backend server
- In production, `VITE_API_URL` env var points to the deployed backend
- Every cart mutation re-fetches the full cart from the server (single source of truth)

---

## 📸 Screenshots

<p align="center"><em>Screenshots will be added after deployment</em></p>

<!-- Uncomment and add screenshot URLs after deployment:
| Page | Screenshot |
|------|-----------|
| Home | ![Home Page](screenshots/home.png) |
| Product Detail | ![Product Detail](screenshots/detail.png) |
| Cart | ![Cart](screenshots/cart.png) |
| Checkout | ![Checkout](screenshots/checkout.png) |
| Order Success | ![Order Success](screenshots/order-success.png) |
-->

---

## 🌐 Deployment

### Frontend → Vercel / Netlify

```bash
cd frontend
npm run build     # Outputs to dist/
```

- Set `VITE_API_URL` to your deployed backend URL
- Deploy the `dist/` folder

### Backend → Render / Railway

- Set all `DB_*` environment variables to your cloud MySQL credentials
- Set `CLIENT_URL` to your deployed frontend URL
- Start command: `npm start`

### Database → PlanetScale / AWS RDS / Railway MySQL

- Run the seed scripts against your cloud database
- Update `DB_HOST`, `DB_USER`, `DB_PASSWORD` accordingly

---

## 🎨 UI/UX Highlights

- ✅ Flipkart-style blue navbar with logo, search bar, and cart badge
- ✅ Responsive grid layout (1 / 2 / 3 / 4 columns based on viewport)
- ✅ Product card hover shadows & image zoom effects
- ✅ Discount badges and green star rating badges
- ✅ Skeleton loading placeholders
- ✅ Toast notifications (add to cart, remove, order placed)
- ✅ Pagination with clickable page numbers
- ✅ Category filter chips
- ✅ Image carousel with clickable thumbnails
- ✅ Hover zoom on product images
- ✅ Wishlist heart toggle animation
- ✅ Fully responsive (desktop, tablet, mobile)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is built for **educational and internship assessment purposes**.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/anmolsalaria">Anmol Salaria</a>
</p>

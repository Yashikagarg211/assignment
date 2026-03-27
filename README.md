# Flipkart Clone — E-Commerce Platform

A full-stack e-commerce web application that closely replicates Flipkart's design and user experience, built for the SDE Intern Fullstack Assignment.

## 🚀 Live Demo
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js 18, Vite, CSS Modules, React Router v6, Zustand |
| **Backend** | Node.js, Express.js, Prisma ORM |
| **Database** | PostgreSQL |
| **HTTP Client** | Axios |

---

## 📁 Project Structure

```
flipkart-clone/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema (9 tables)
│   │   └── seed.js              # Sample data (24 products, 6 categories)
│   ├── src/
│   │   ├── index.js             # Express app entry
│   │   ├── lib/prisma.js        # Prisma client singleton
│   │   └── routes/
│   │       ├── products.js      # GET /products, GET /products/:id
│   │       ├── categories.js    # GET /categories
│   │       ├── cart.js          # CRUD /cart
│   │       └── orders.js        # POST/GET /orders
│   └── .env
├── frontend/
│   └── src/
│       ├── api/api.js           # Axios API client
│       ├── store/cartStore.js   # Zustand cart state
│       ├── components/          # Navbar, Footer, ProductCard, ImageCarousel, StarRating
│       └── pages/               # 6 pages
└── README.md
```

---

## 🗄 Database Schema

```
users          → guests + registered users
addresses      → delivery addresses (linked to user + order)
categories     → product categories (self-referential for subcategories)
products       → main product table with price/mrp/discount/stock/rating
product_images → multiple images per product (primary flag + sort order)
product_specs  → key-value specs per product
cart_items     → user's cart (user_id + product_id unique constraint)
orders         → placed orders with status, subtotal, total
order_items    → individual items within an order (price locked at purchase time)
```

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL running on port 5000

### 1. Backend Setup

```bash
cd backend
npm install

# Migrate database (creates flipkart_db automatically)
npx prisma migrate dev --name init

# Seed sample data
node prisma/seed.js

# Start backend
npm run dev
```

Backend runs on **http://localhost:8000**

### 2. Frontend Setup

```bash
cd frontend
npm install

# Start frontend
npm run dev
```

Frontend runs on **http://localhost:3000**

---

## ✨ Core Features

### 1. Product Listing Page (`/products`)
- Grid layout matching Flipkart's card design
- Search by product name
- Filter by category (sidebar)
- Sort by: Newest, Popularity, Rating, Price (asc/desc)
- Pagination (12 per page)

### 2. Product Detail Page (`/products/:id`)
- Image carousel with thumbnail strip
- Product description + specifications table
- Price, MRP, discount % display
- Stock availability status
- Add to Cart + Buy Now buttons with quantity control

### 3. Shopping Cart (`/cart`)
- View all items with images, names, prices
- Update quantity (increment/decrement)
- Remove items
- Price summary: MRP total, discount saved, shipping, total

### 4. Order Placement (`/checkout` → `/order-confirmation/:id`)
- Shipping address form with validation
- Order summary review
- Places order via POST /api/orders (transaction: stock decrement + cart clear)
- Confirmation page with animated checkmark + Order ID

---

## 🎨 Design Decisions

- **Flipkart Blue** `#2874f0` + **Accent Yellow** `#ff9f00` — brand-accurate palette
- **CSS Modules** — scoped styles, no class conflicts, easy to maintain
- **Zustand** — minimal cart state management (no Redux boilerplate)
- **Default user** — `guest@flipkart.com` auto-logged in. No auth required per spec.
- **Vite proxy** — frontend `/api/*` proxied to backend `localhost:8000`, no CORS issues in dev
- **Prisma transactions** — order placement atomically decrements stock and clears cart

---

## 📦 Sample Data

- **6 Categories**: Mobiles, Laptops, Fashion, Electronics, Home & Kitchen, Books
- **24 Products** with realistic prices, MRP, ratings, multiple images, 8-12 specs each
- Product images from Unsplash (no API key needed)

---

## Assumptions

1. A default guest user is auto-seeded and used for all cart/order operations
2. No payment gateway integration — order is "confirmed" immediately
3. Shipping cost is flat ₹40
4. Database: PostgreSQL on `localhost:5000` with database name `flipkart_db`

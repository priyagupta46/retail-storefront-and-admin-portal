# RetailHub - Full-Stack Retail System
.
A complete retail system with a customer storefront and admin portal built with React, Node.js, Express, and MongoDB.

## 📋 Features

### Customer Storefront
- ✅ Home page with product catalog and search
- ✅ Product listing with pagination
- ✅ Product detail pages with quantity selector
- ✅ Shopping cart with add, update, remove functionality
- ✅ Order checkout with customer information validation
- ✅ Order success confirmation screen
- ✅ Tax calculation (10% fixed rate)
- ✅ Stock validation (prevent overselling)

### Admin Portal
- ✅ Secure login with JWT authentication
- ✅ Dashboard with today's orders, revenue, and low stock alerts
- ✅ Product management (Create, Read, Update, Delete)
- ✅ Product image upload (JPG/PNG, max 2MB)
- ✅ Product status activation/deactivation
- ✅ Order management with status tracking
- ✅ Order filtering by status and date
- ✅ Order detail view with customer information

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Seed the database with sample data:
```bash
npm run seed
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📊 Database

The application uses MongoDB with the following collections:

### Products
- `id` - Document identifier
- `name` - Product name
- `description` - Product description
- `price` - Product price
- `stock` - Available stock quantity
- `category` - Product category (Electronics, Accessories)
- `status` - Active/Inactive
- `image_url` - URL to product image
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Orders
- `id` - Document identifier
- `customer_name` - Full name of customer
- `email` - Customer email
- `contact_number` - Phone number
- `shipping_address` - Delivery address
- `status` - Order status (New, Processing, Shipped, Cancelled)
- `total` - Total order amount
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Order Items
- Stored inside each order document as `items[]`
- Each item contains `product`, `quantity`, `unit_price`, `line_total`

### AdminUsers
- `id` - Document identifier
- `email` - Admin email
- `password` - Hashed password
- `role` - Admin role
- `created_at` - Creation timestamp

## 🔐 Default Admin Credentials

**Email:** `admin@retail.com`  
**Password:** `admin123`

> ⚠️ Change these credentials in production!

## 📦 Sample Data

The database is seeded with:
- 8 products across 2 categories (Electronics, Accessories)
- 1 sample order with order items
- 1 admin user

### Sample Products
1. Wireless Headphones - $199.99
2. USB-C Cable - $12.99
3. Phone Case - $15.99
4. Screen Protector - $9.99
5. Portable Charger - $34.99
6. Bluetooth Speaker - $49.99
7. Phone Stand - $14.99
8. Stylus Pen - $24.99

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (requires token)

### Products
- `GET /api/products` - Get all products (public, only Active)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `PATCH /api/products/:id/status` - Toggle product status (admin only)

### Orders
- `POST /api/orders` - Create order (public)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order details (admin only)
- `PATCH /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders/admin/stats` - Get dashboard statistics (admin only)

## 🎨 Technology Stack

### Frontend
- React 18
- React Router v6
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcryptjs (password hashing)
- Multer (file uploads)

## 📝 Validation Rules

### Checkout Form
- **Name:** 3-100 characters
- **Email:** Valid email format
- **Contact Number:** 7-15 characters
- **Shipping Address:** 10-200 characters

### Product Upload
- **Format:** JPEG or PNG only
- **Max Size:** 2MB

### Stock Management
- Quantity added to cart cannot exceed available stock
- Stock automatically reduces when order is placed
- Stock is restored if order is cancelled

## 🗂️ Project Structure

```
retail-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   └── orders.js
│   │   ├── models/
│   │   │   ├── AdminUser.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── utils/
│   │   │   └── database.js
│   │   ├── index.js
│   │   └── seed.js
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── OrderSuccess.js
│   │   │   ├── AdminLogin.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AdminProducts.js
│   │   │   ├── AdminProductForm.js
│   │   │   ├── AdminOrders.js
│   │   │   ├── AdminOrderDetail.js
│   │   │   └── ProtectedRoute.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── context/
│   │   │   └── CartContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🔄 Order Workflow

1. **Customer** browses products on storefront
2. **Customer** adds items to cart and proceeds to checkout
3. **Customer** fills checkout form and places order
4. **Order** is created with status "New"
5. **Admin** views order in admin portal
6. **Admin** updates order status: New → Processing → Shipped → Completed
7. **Customer** receives order confirmation email (optional in this version)
8. **Stock** is automatically managed based on orders and cancellations

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Tailwind CSS responsive utilities
- Grid layouts that adapt to screen size
- Touch-friendly buttons and inputs

## 🔒 Security Features

- JWT-based authentication for admin
- Password hashing with bcryptjs
- CORS enabled for safe cross-origin requests
- Input validation on both client and server
- Protected admin routes
- File upload validation (type and size)

## 🚀 Deployment Notes

1. Update JWT_SECRET in `.env` for production
2. Use environment variables for database path
3. Enable HTTPS in production
4. Set up proper CORS policies
5. Implement rate limiting
6. Add database backups
7. Monitor server logs

## 📄 License

MIT

## 👨‍💼 Support

For issues or questions, please contact support@retailhub.com

---

**Version:** 1.0.0  
**Last Updated:** January 2026

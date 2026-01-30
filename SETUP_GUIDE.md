# Complete Retail System - Installation & Setup Guide

## 📋 Project Overview

**RetailHub** is a full-stack retail application featuring:
- Customer-facing storefront (React)
- Admin management portal (React)
- RESTful backend API (Express.js)
- MongoDB database

All files have been created and integrated into your workspace.

## ✅ What's Been Built

### Backend Files (Node.js/Express)
- ✅ Server setup with CORS and middleware
- ✅ MongoDB database with collections for products, orders, and admin users
- ✅ JWT authentication system
- ✅ Product management API with image uploads
- ✅ Order management API with status tracking
- ✅ Dashboard statistics endpoint
- ✅ Database seeding script with 8 sample products

### Frontend Files (React)
- ✅ React Router with complete navigation
- ✅ Storefront pages: Home, Product Detail, Cart, Checkout, Order Success
- ✅ Admin pages: Login, Dashboard, Products, Orders
- ✅ Context API for cart state management
- ✅ Tailwind CSS styling (responsive design)
- ✅ API client with axios

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory
```powershell
cd "C:\Users\Roshan\Downloads\allAboutCoding\retail  storefront and Admin Portal"
```

### Step 2: Run Setup (Windows)
```powershell
.\setup.bat
```

**OR** Manual Installation:

```powershell
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Seed the Database
```powershell
cd backend
npm run seed
```

Output should show:
```
Connected to MongoDB
Admin user created: admin@retail.com / admin123
Seeded 8 products
Seeded sample orders
Database seeding completed successfully!
```

### Step 4: Start Backend Server
Open a new terminal and run:
```powershell
cd backend
npm run dev
```

Server will run at `http://localhost:5000`

### Step 5: Start Frontend
Open another terminal and run:
```powershell
cd frontend
npm start
```

Application will open at `http://localhost:3000`

## 🔐 Default Credentials

**Admin Portal Login:**
- Email: `admin@retail.com`
- Password: `admin123`

> Change these credentials before deploying to production!

## 🎯 How to Use

### Customer Experience
1. Visit `http://localhost:3000`
2. Browse products with search and category filter
3. Click product to view details
4. Add items to cart
5. Go to cart and review order
6. Proceed to checkout
7. Fill customer information
8. Place order
9. See confirmation with Order ID

### Admin Experience
1. Go to `http://localhost:3000/admin/login`
2. Login with credentials above
3. View dashboard with stats
4. Manage products (create, edit, delete, activate/deactivate)
5. Upload product images
6. View and manage orders
7. Update order status

## 📁 Project Structure

```
retail  storefront and Admin Portal/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Business logic
│   │   ├── middleware/           # Auth, error handling
│   │   ├── routes/               # API endpoints
│   │   ├── utils/                # Database functions
│   │   ├── index.js              # Server entry point
│   │   └── seed.js               # Database seeding
│   ├── uploads/                  # Product images
│   ├── package.json
│   ├── .env                      # Configuration
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── pages/                # Page components
│   │   ├── components/           # Reusable components
│   │   ├── context/              # Cart state
│   │   ├── utils/                # API client
│   │   ├── App.js                # Main app
│   │   └── index.js              # Entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── README.md                      # Full documentation
├── setup.bat                      # Windows setup
├── setup.sh                       # Unix/Mac setup
└── .gitignore

```

## 🧪 Testing the Application

### Test Customer Flow
1. **Add to Cart:** Click "Add to Cart" on any product
2. **View Cart:** Click "Cart" in header
3. **Checkout:** Fill form and submit
4. **Success:** View order confirmation with Order ID

### Test Admin Flow
1. **Login:** admin@retail.com / admin123
2. **Dashboard:** View stats and alerts
3. **Create Product:** Click "Create Product"
4. **Edit Product:** Click "Edit" on any product
5. **View Orders:** Go to Orders section
6. **Update Order:** Click "View" and change status

## 🔧 Available Commands

### Backend
```bash
npm run dev      # Start server with auto-reload
npm run seed     # Seed database with sample data
npm start        # Start production server
```

### Frontend
```bash
npm start        # Start development server
npm build        # Build for production
npm test         # Run tests
```

## 🎨 Key Features Implemented

### Customer Storefront ✅
- [x] Product search and filtering
- [x] Product pagination
- [x] Product detail view
- [x] Add to cart with quantity
- [x] Shopping cart with update/remove
- [x] Checkout form validation
- [x] Order placement
- [x] Order confirmation

### Admin Portal ✅
- [x] Secure login
- [x] Dashboard with statistics
- [x] Low stock alerts
- [x] Product CRUD operations
- [x] Image upload (2MB JPG/PNG)
- [x] Product status toggle
- [x] Order list with filters
- [x] Order detail view
- [x] Order status management

### Backend ✅
- [x] RESTful API
- [x] JWT authentication
- [x] Input validation
- [x] Stock management
- [x] Order processing
- [x] Error handling
- [x] CORS enabled

### Database ✅
- [x] Products table
- [x] Orders table
- [x] OrderItems table
- [x] AdminUsers table
- [x] Sample data seeding
- [x] Foreign key constraints

## 📊 Sample Data

### 8 Products Seeded
1. **Wireless Headphones** - Electronics - $199.99 - 50 stock
2. **USB-C Cable** - Electronics - $12.99 - 200 stock
3. **Phone Case** - Accessories - $15.99 - 150 stock
4. **Screen Protector** - Accessories - $9.99 - 300 stock
5. **Portable Charger** - Electronics - $34.99 - 75 stock
6. **Bluetooth Speaker** - Electronics - $49.99 - 60 stock
7. **Phone Stand** - Accessories - $14.99 - 120 stock
8. **Stylus Pen** - Accessories - $24.99 - 90 stock

### Sample Order
- Customer: John Doe
- Email: john@example.com
- Items: 1x Wireless Headphones + 4x USB-C Cable
- Total: $249.98

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in backend .env
PORT=5001

# Or kill process using port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000 | kill -9 <PID>
```

### Database Issues
```bash
# Drop the database or clear collections, then reseed
cd backend
npm run seed
```

### CORS Errors
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env
- Verify backend .env has correct settings

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
```

## 📚 API Documentation

See [README.md](README.md) for complete API endpoint documentation including:
- Request/response examples
- Authentication headers
- Query parameters
- Error codes

## 🔒 Security Notes

1. Change admin password after first login
2. Use environment variables for sensitive data
3. Enable HTTPS in production
4. Implement rate limiting
5. Add CSRF protection for forms
6. Validate all inputs server-side
7. Use prepared statements (already implemented)

## 📈 Performance Considerations

- Pagination implemented (12 products, 10 orders per page)
- Database indexes recommended for production
- Image optimization via sharp (installed)
- Lazy loading for product images
- Cart state stored in localStorage

## 🚢 Deployment Checklist

- [ ] Change admin credentials
- [ ] Update JWT_SECRET
- [ ] Configure production database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Setup environment variables
- [ ] Configure CORS for production
- [ ] Setup error logging
- [ ] Add database backups
- [ ] Setup monitoring

## 📞 Support

For issues or customization needs:
1. Check README.md for detailed documentation
2. Review backend controllers for business logic
3. Check frontend components for UI structure
4. Verify database schema for data models

## ✨ Customization Ideas

- Add product images via admin upload
- Implement email notifications
- Add user accounts/profiles
- Implement payment processing
- Add product reviews/ratings
- Create inventory management dashboard
- Add shipping calculator
- Implement discount codes
- Add wishlist functionality
- Create analytics dashboard

---

**All files are ready to use. No additional setup needed beyond npm install and seed!**

Happy coding! 🎉

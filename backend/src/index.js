require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { connectDatabase } = require('./utils/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Initialize database
async function startServer() {
  try {
    await connectDatabase();
    
    // Import routes AFTER database connection is established
    const adminAuthRoutes = require('./routes/adminAuth');
    const productRoutes = require('./routes/products');
    const orderRoutes = require('./routes/orders');
    
    // Routes
    app.use('/api/admin', adminAuthRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    // Root route
    app.get('/', (req, res) => {
      res.json({
        message: 'RetailHub API Server',
        status: 'Running',
        version: '1.0.0',
        endpoints: {
          admin: '/api/admin/login',
          products: '/api/products',
          orders: '/api/orders',
          health: '/api/health'
        }
      });
    });

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server error:', error);
    process.exit(1);
  }
}

startServer();

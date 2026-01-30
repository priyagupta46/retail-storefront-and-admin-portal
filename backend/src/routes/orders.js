const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { requireAdminAuth } = require('../middleware/auth');

// Public routes
router.post('/', orderController.createOrder);

// Admin routes
router.get('/', requireAdminAuth, orderController.getAllOrders);
router.get('/:id', requireAdminAuth, orderController.getOrderById);
router.patch('/:id/status', requireAdminAuth, orderController.updateOrderStatus);
router.get('/admin/stats', requireAdminAuth, orderController.getDashboardStats);

module.exports = router;

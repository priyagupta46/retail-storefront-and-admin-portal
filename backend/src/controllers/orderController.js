const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

async function getAllOrders(req, res) {
  try {
    const { status = '', startDate = '', endDate = '', page = 1, limit = 10 } = req.query;

    const filters = {};
    if (status) {
      filters.status = status;
    }

    if (startDate || endDate) {
      filters.created_at = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filters.created_at.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filters.created_at.$lte = end;
      }
    }

    const total = await Order.countDocuments(filters);
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const orderDocs = await Order.find(filters)
      .sort({ created_at: -1 })
      .skip(offset)
      .limit(parseInt(limit));

    const orders = orderDocs.map((doc) => doc.toJSON());

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('items.product');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = order.items.map((item) => ({
      id: item._id.toString(),
      name: item.product ? item.product.name : 'Unknown Product',
      image_url: item.product ? item.product.image_url : null,
      quantity: item.quantity,
      unit_price: item.unit_price,
      line_total: item.line_total
    }));

    const orderJson = order.toJSON();
    orderJson.items = items;
    res.json(orderJson);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createOrder(req, res) {
  try {
    const { customerName, email, contactNumber, shippingAddress, items } = req.body;

    if (!customerName || !email || !contactNumber || !shippingAddress || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate contact number (basic validation)
    if (contactNumber.length < 7 || contactNumber.length > 15) {
      return res.status(400).json({ error: 'Invalid contact number' });
    }

    // Calculate total and verify stock
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ error: `Invalid product id ${item.productId}` });
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ${product.name}` });
      }

      const lineTotal = product.price * item.quantity;
      total += lineTotal;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        unit_price: product.price,
        line_total: lineTotal
      });
    }

    const order = await Order.create({
      customer_name: customerName,
      email,
      contact_number: contactNumber,
      shipping_address: shippingAddress,
      status: 'New',
      total,
      items: orderItems
    });

    for (const item of orderItems) {
      await Product.updateOne(
        { _id: item.product },
        { $inc: { stock: -item.quantity } }
      );
    }

    res.status(201).json(order.toJSON());
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Processing', 'Shipped', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If cancelling, restore stock
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      for (const item of order.items) {
        await Product.updateOne(
          { _id: item.product },
          { $inc: { stock: item.quantity } }
        );
      }
    }

    order.status = status;
    const updated = await order.save();
    res.json(updated.toJSON());
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getDashboardStats(req, res) {
  try {
    // Today's orders count
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todayOrders = await Order.countDocuments({
      created_at: { $gte: start, $lte: end }
    });

    const revenueAgg = await Order.aggregate([
      {
        $match: {
          created_at: { $gte: start, $lte: end },
          status: { $ne: 'Cancelled' }
        }
      },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const lowStockDocs = await Product.find({ stock: { $lt: 5 }, status: 'Active' })
      .select('name stock')
      .limit(20);
    const lowStock = lowStockDocs.map((doc) => doc.toJSON());

    const activeProducts = await Product.countDocuments({ status: 'Active' });

    res.json({
      todayOrders: todayOrders || 0,
      todayRevenue: revenueAgg[0]?.total || 0,
      lowStockCount: lowStock.length,
      lowStockProducts: lowStock,
      activeProducts: activeProducts || 0
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getDashboardStats
};

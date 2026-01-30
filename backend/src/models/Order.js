const mongoose = require('mongoose');
const { getConnection } = require('../utils/database');

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit_price: { type: Number, required: true, min: 0 },
    line_total: { type: Number, required: true, min: 0 }
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    contact_number: { type: String, required: true, trim: true },
    shipping_address: { type: String, required: true, trim: true },
    status: { type: String, enum: ['New', 'Processing', 'Shipped', 'Cancelled'], default: 'New' },
    total: { type: Number, required: true, min: 0 },
    items: [orderItemSchema]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

module.exports = (() => {
  try {
    const conn = getConnection();
    return conn.models.Order || conn.model('Order', orderSchema);
  } catch (e) {
    return null;
  }
})();

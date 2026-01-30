const mongoose = require('mongoose');
const { getConnection } = require('../utils/database');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    image_url: { type: String, default: null }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

productSchema.set('toJSON', {
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
    return conn.models.Product || conn.model('Product', productSchema);
  } catch (e) {
    return null;
  }
})();

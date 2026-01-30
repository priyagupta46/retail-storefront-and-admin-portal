const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { getConnection } = require('../utils/database');

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  }
}, {
  timestamps: true,
  collection: 'adminusers'
});

// Hash password before saving
adminUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords
adminUserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Use the dedicated connection
module.exports = (() => {
  try {
    const conn = getConnection();
    return conn.models.AdminUser || conn.model('AdminUser', adminUserSchema, 'adminusers');
  } catch (e) {
    // Fallback during initialization - will be replaced when connection is ready
    return null;
  }
})();

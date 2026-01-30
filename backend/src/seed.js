require('dotenv').config();
const { connectDatabase, getConnection } = require('./utils/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema directly in seed script
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

async function seed() {
  try {
    const connection = await connectDatabase();
    
    // Register the model on this connection
    const AdminUser = connection.model('AdminUser', adminUserSchema, 'adminusers');

    // Clear existing data
    await AdminUser.deleteMany({});

    // Create admin user (password will be hashed by the pre-save hook)
    await AdminUser.create({
      email: 'admin@store.com',
      password: 'admin123'
    });
    console.log('✅ Admin created: admin@store.com / admin123');

    console.log('\n✓ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();

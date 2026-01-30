const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = '24h';

exports.login = async (req, res) => {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Request body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const emailToFind = email.toLowerCase();
    console.log('Searching for email:', emailToFind);
    console.log('Using collection:', AdminUser.collection.name);
    console.log('Model name:', AdminUser.modelName);
    console.log('Database name:', AdminUser.db.name);
    console.log('Connection state:', AdminUser.db.readyState);
    
    // Find admin - password is now always selected
    const admin = await AdminUser.findOne({ email: emailToFind });
    console.log('Query result:', admin);
    
    // If model query fails, try direct DB query
    if (!admin) {
      console.log('Model query failed, trying direct DB query...');
      const directResult = await AdminUser.db.db.collection('adminusers').findOne({ email: emailToFind });
      console.log('Direct query result:', directResult);
    }
    
    if (!admin) {
      console.log('Admin not found in database');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Admin found, comparing password...');
    // Compare password
    const isValid = await admin.comparePassword(password);
    console.log('Password comparison result:', isValid);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id.toString(), email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    // Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      message: 'Logged in successfully',
      admin: {
        id: admin._id.toString(),
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'Logged out successfully' });
};

exports.me = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({
      id: admin._id.toString(),
      email: admin.email
    });
  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

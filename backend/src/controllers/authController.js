const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

// Login - sets HTTP-only cookie
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find admin and include password field
    const admin = await AdminUser.findOne({ 
      email: email.toLowerCase().trim() 
    }).select('+password');

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password using model method
    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { adminId: admin._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      success: true,
      admin: admin.toJSON()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Logout - clears cookie
async function logout(req, res) {
  res.clearCookie('adminToken');
  res.json({ success: true, message: 'Logged out successfully' });
}

// Get current admin
async function me(req, res) {
  try {
    const admin = await AdminUser.findById(req.adminId);
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ admin: admin.toJSON() });
  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { login, logout, me };

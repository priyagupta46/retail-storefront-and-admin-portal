const jwt = require('jsonwebtoken');

// Middleware to verify admin JWT from cookie
function requireAdminAuth(req, res, next) {
  try {
    // Get token from cookie
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach admin ID to request
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });}
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired' });
    }
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { requireAdminAuth };

const express = require('express');
const router = express.Router();
const { login, logout, me } = require('../controllers/authController');
const { requireAdminAuth } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes
router.post('/logout', requireAdminAuth, logout);
router.get('/me', requireAdminAuth, me);

module.exports = router;

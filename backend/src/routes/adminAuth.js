const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { login, logout, me } = require('../controllers/adminAuthController');

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', adminAuth, me);

module.exports = router;

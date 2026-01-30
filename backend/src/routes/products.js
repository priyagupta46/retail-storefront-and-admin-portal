const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');
const { requireAdminAuth } = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  
  if (allowedMimes.includes(file.mimetype) && allowedExtensions.includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', requireAdminAuth, upload.single('image'), productController.createProduct);
router.put('/:id', requireAdminAuth, upload.single('image'), productController.updateProduct);
router.delete('/:id', requireAdminAuth, productController.deleteProduct);
router.patch('/:id/status', requireAdminAuth, productController.updateProductStatus);

module.exports = router;

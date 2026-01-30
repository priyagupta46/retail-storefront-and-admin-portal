const Product = require('../models/Product');

async function getAllProducts(req, res) {
  try {
    const { search = '', category = '', status = '', page = 1, limit = 12 } = req.query;

    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (category) {
      filters.category = category;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filters.$or = [{ name: regex }, { description: regex }];
    }

    const total = await Product.countDocuments(filters);

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const productDocs = await Product.find(filters)
      .sort({ created_at: -1 })
      .skip(offset)
      .limit(parseInt(limit));

    const products = productDocs.map((doc) => doc.toJSON());
    
    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product.toJSON());
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price, stock, category, status = 'Active' } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || stock === undefined || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await Product.create({
      name,
      description: description || '',
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category,
      status,
      image_url: imageUrl
    });

    res.status(201).json(product.toJSON());
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, status } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let imageUrl = product.image_url;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    product.name = name || product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? parseFloat(price) : product.price;
    product.stock = stock !== undefined ? parseInt(stock, 10) : product.stock;
    product.category = category || product.category;
    product.status = status || product.status;
    product.image_url = imageUrl;

    const updated = await product.save();
    res.json(updated.toJSON());
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await Product.deleteOne({ _id: id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateProductStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.status = status;
    const updated = await product.save();
    res.json(updated.toJSON());
  } catch (error) {
    console.error('Update product status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus
};

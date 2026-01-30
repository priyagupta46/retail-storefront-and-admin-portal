import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const { addToCart } = useCart();
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products', {
          params: { search, category, status: 'Active', page, limit: 12 }
        });
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, page]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {notification && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-800">
          {notification}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>

      {/* Filters */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-4 py-2 border border-gray-300 rounded"
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={`http://localhost:5000${product.image_url}`}
                      alt={product.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description.substring(0, 60)}...</p>
                  <p className="text-lg font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
                  
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 bg-gray-600 text-white py-2 rounded text-center hover:bg-gray-700"
                    >
                      View
                    </Link>
                    {product.stock > 0 && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    )}
                    {product.stock === 0 && (
                      <button disabled className="flex-1 bg-gray-400 text-white py-2 rounded cursor-not-allowed">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded ${
                    page === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
